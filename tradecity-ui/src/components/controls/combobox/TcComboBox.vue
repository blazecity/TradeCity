<template>
<tc-tooltip :text="placeholder" :visible="!expanded">
    <div :class="['relative inline-block text-xs', styles]" @click="comboboxClicked">
        <div class="flex items-center justify-between rounded-sm w-56 border-neutral-600 border pl-1 pr-0.5 py-1">
            <div class="flex items-center overflow-auto no-scroll">
                <div v-if="selectedItems.items.size === 0" class="text-neutral-400 line-clamp-1">{{ placeholder }}</div>
                <div v-for="[key, item] in selectedItems.items" :key="key" class="flex flex-nowrap shrink-0 justify-between items-center bg-gray-600 ml-0.5 rounded-sm pl-1">
                    <span>{{ item.name }}</span>
                    <clickable-icon styles="mx-0.5 mt-0.5" @click="mutateEntries(key)">
                        <close-icon :height="10" :width="10" styles="fill-neutral-400" />
                    </clickable-icon>
                </div>
            </div>
            <clickable-icon @click="expand">
                <north-icon v-if="expanded" :height="16" :width="16" styles="fill-neutral-400 mr-0.5"></north-icon>
                <south-icon v-else :height="16" :width="16" styles="fill-neutral-400 mr-0.5" />
            </clickable-icon>
        </div>
        <div v-if="expanded" class="absolute rounded-sm border-neutral-600 border block mt-1 w-full p-1">
            <tc-input placeholder="Search" styles="w-full mb-1" type="string" @text-input="searchItems" />
            <div v-for="[key, item] in shownItems" :key="key" @click="mutateEntries(key)" :class="['px-1.5 py-0.5 rounded-sm hover:bg-tc-blue',  markedItemCursor !== -1 && shownItems[markedItemCursor][0] === key ? 'bg-tc-blue' : '']"> {{ item }}</div>
        </div>
    </div>
</tc-tooltip>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import ClickableIcon from '../../icons/ClickableIcon.vue';
import NorthIcon from '../../icons/NorthIcon.vue';
import SouthIcon from '../../icons/SouthIcon.vue';
import CloseIcon from '../../icons/CloseIcon.vue';
import TcInput from '../input/TcInput.vue';
import TcTooltip from '../tooltip/TcToolTip.vue';
import { ComboBoxItemList, ComboBoxItem } from './combobox';
import { useEventBus } from '../../../utils/store';
import { Orama, create, insert, search, stemmers } from '@orama/orama';

// TODO: Show placeholder

interface TcComboBoxProps {
    itemList: ComboBoxItemList,
    placeholder: string,
    multiSelect?: boolean,
    styles?: string
}

const props = defineProps<TcComboBoxProps>();

interface TcComboBoxEmits {
    (event: "selectionChanged", value: ComboBoxItemList): void;
}

const emit = defineEmits<TcComboBoxEmits>();

const db = ref<Orama>();
searchSetup();
const expanded = ref(false);
let clickedOn = false;
const selectedItems = reactive({
    items: new Map<string, ComboBoxItem>()
});
const shownItems = ref<Array<[string, string]>>(Object.entries(props.itemList).map(([key, value]) => [key, value.name]));
const { booleanEventBus } = useEventBus();
booleanEventBus.subscribe("escape_clicked", () => expanded.value = false);
booleanEventBus.subscribe("outside_clicked", () => {
    expanded.value = clickedOn && expanded.value;
    clickedOn = false;
});
const comboboxClicked = () => clickedOn = true;
function expand(): void {
    expanded.value = !expanded.value;
}

const markedItemCursor = ref(-1);
document.addEventListener("keydown", event => {
    if (expanded.value) {
        if (event.key === "ArrowDown") {
            const nextCursor = markedItemCursor.value + 1;
            markedItemCursor.value = nextCursor % shownItems.value.length;
        }

        if (event.key === "ArrowUp") {
            const nextCursor = markedItemCursor.value - 1;
            markedItemCursor.value = nextCursor === -1 ? shownItems.value.length - 1 : nextCursor;
        }

        if (event.key === "Enter") {
            mutateEntries(shownItems.value[markedItemCursor.value][0]);
        }
    }
});

function mutateEntries(clickedKey: string): void {
    const result = selectedItems.items.get(clickedKey);

    if (props.multiSelect) {
        if (result) selectedItems.items.delete(clickedKey);
        else selectedItems.items.set(clickedKey, props.itemList[clickedKey]);
    } else {
        selectedItems.items.clear();
        selectedItems.items.set(clickedKey, props.itemList[clickedKey]);
    }

    emit("selectionChanged", Object.fromEntries(selectedItems.items));
}

function searchSetup(): void {
    create({
        schema: {
            key: "string",
            name: "string",
            tags: "string"
        },
        components: {
            tokenizer: {
                stemmer: stemmers.english
            }
        }
    }).then(async index => {
        for (const [key, value] of Object.entries(props.itemList)) {
            await insert(index, {
                key, 
                name: value.name,
                tags: value.tags.concat(key.toLowerCase(), value.name.toLowerCase())
            });
        }

        db.value = index;
    });
}

function searchItems(searchText: string): void {
    console.log("search text", searchText);

    if (searchText === "") {
        shownItems.value = Object.entries(props.itemList).map(([key, value]) => [key, value.name])
        return;
    }

    if (db.value) {
        search(db.value, {
            term: searchText,
            properties: "*"
        }).then(results => {
            shownItems.value = results.hits.map(hit => [hit.document.key as string, props.itemList[hit.document.key as string].name]);
        });
    }
}
</script>

<style scoped>
.no-scroll::-webkit-scrollbar {
    display: none;
}

.no-scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
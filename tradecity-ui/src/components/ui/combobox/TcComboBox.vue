<template>
    <div :id="uuid" class="inline-block relative text-normal">
        <div class="flex items-center gap-2">
            <span v-if="withLabel" class="whitespace-nowrap">{{ placeholder }}</span>
            <div :class="[
                'flex items-center justify-between pl-1 pr-px py-0.5 w-full rounded-sm',
                {'outline outline-base outline-1': expanded},
                dark ? 'bg-input-dark' : 'bg-input'
            ]">
                <input v-if="editable" v-model="searchTerm" type="text" class="bg-transparent outline-none" :placeholder="placeholder">
                <div v-else class="flex gap-1 overflow-x-auto scrollbar">
                    <tc-combo-box-selected-item v-if="numberOfSelectedItems > 0">
                        {{ items[firstSelectedItem]?.label }}
                    </tc-combo-box-selected-item>
                    <tc-combo-box-selected-item v-else-if="numberOfSelectedItems > 1">
                        +{{ numberOfSelectedItems - 1 }}
                    </tc-combo-box-selected-item>
                    <span v-else class="text-gray-400">{{ placeholder }}</span>
                </div>
                <tc-icon class="large-icon ml-1" :icon="expanded ? 'north' : 'south'" clickable @click="handleExpandClick" />
            </div>
        </div>
        <!-- dropdown -->
        <div v-if="expanded" :class="['dropdown absolute border-neutral-900 border p-1 mt-1 max-h-80 overflow-hidden z-10 w-full', dark ? 'bg-input-dark' : 'bg-input']">
            <!-- dropdown action bar -->
            <div v-if="multiSelect" class="flex items-center gap-1 mb-1.5">
                <tc-button text="Select all" @click="handleSelectAllClick"/>
                <tc-button text="Remove all" @click="handleRemoveAllClick" dangerous/>
            </div>
            <div class="overflow-auto h-full">
                <div v-for="([id, isSelected], index) in displayedDropdownItems" :key="index"
                     class="flex items-center px-0.5">
                    <tc-check-box
                        :model-value="isSelected"
                        @update:model-value="isNowSelected => handleSelectedClick(id, isNowSelected)"
                    />
                    <div class="flex items-center flex-grow standard-hover rounded-sm px-1 ml-1"
                         @click="() => handleSelectedClick(id, !isSelected)">
                        <span>{{ items[id].label }}</span>
                        <slot :item="items[id]"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T extends object">
import {computed, ref, watch} from "vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcComboBoxSelectedItem from "@/components/ui/combobox/TcComboBoxSelectedItem.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import TcCheckBox from "@/components/ui/input/TcCheckBox.vue";
import {ComboBoxItems, useSearch} from "@/components/ui/combobox/index";
import {useClickContext} from "@/stores/clickcontext";
// TODO: Muss über v-model gesteuert werden, da sonst keine Defaultwerte gesetzt werden können.
// Flow: -> Die selektierten Items sind über den props mitgegeben, um sie als selektiert zu markieren, muss man
// vergleichen, ob sie ob das item inter selektierten Collection drin ist. Es wäre dabei etwas effizienter die Combo
// Box items als Objekt hineinzugeben, da dann mit einem Key gearbeitet werden kann.
type TcComboBoxProps = {
    items: ComboBoxItems<T>;
    placeholder: string;
    level?: number;
    multiSelect?: boolean;
    withLabel?: boolean;
    editable?: boolean;
    selection: ComboBoxItems<T>;
    dark?: boolean;
}
const props = withDefaults(defineProps<TcComboBoxProps>(), {
    level: 0
});

type TcComboBoxEmits = {
    "selectionChanged": [currentSelection: Array<string>, selectionAdded: Array<string>, selectionRemoved: Array<string>];
    "update:selection": [currentSelection: Array<string>];
};
const emits = defineEmits<TcComboBoxEmits>();

const {registerHandler} = useClickContext();
const searchDb = useSearch(props.items);

const uuid = crypto.randomUUID();
const expanded = ref(false);
const searchTerm = ref("");
const dropdownItems = ref(new Map(Object.keys(props.items).map(key => [key, false])));
const displayedDropdownItems = ref(dropdownItems.value);
const numberOfSelectedItems = computed(() => [...dropdownItems.value.values()].filter(isSelected => isSelected).length);
const firstSelectedItem = computed(() => [...dropdownItems.value.entries()].find(([, isSelected]) => isSelected)?.[0]);
const previousSelectedId = ref<string>();
watch(searchTerm, async val => {
    if (val === "") {
        displayedDropdownItems.value = dropdownItems.value;
        return;
    }
    expanded.value = true;
    const searchResult: [string] = await searchDb.value(val);
    displayedDropdownItems.value = new Map([...searchResult.map(id => [id, dropdownItems.value.get(id)])]);
}, {immediate: true});

registerHandler(uuid, props.level, () => {
    if (expanded.value) {
        expanded.value = false;
        return true;
    }

    return false;
});

// ========== EVENT HANDLERS ==========
function handleExpandClick(): void {
    expanded.value = !expanded.value;
}

function handleSelectAllClick(): void {
    const selectionAdded: Array<string> = [];
    dropdownItems.value.forEach((isSelected, item) => {
        if (!isSelected) {
            selectionAdded.push(item);
            dropdownItems.value.set(item, true);
        }
    });
    emits("selectionChanged", ...dropdownItems.value, selectionAdded, []);
}

function handleRemoveAllClick(): void {
    const selectionRemoved: Array<string> = [];
    dropdownItems.value.forEach((isSelected, id) => {
        if (isSelected) {
            selectionRemoved.push(id);
            dropdownItems.value.set(id, false);
        }
    });
    emits("selectionChanged", [...dropdownItems.value.keys()], [], selectionRemoved);
}

function handleSelectedClick(id: string, isSelected: boolean): void {
    if (!props.multiSelect && isSelected && previousSelectedId.value) {
        dropdownItems.value.set(previousSelectedId.value, false);
    }

    dropdownItems.value.set(id, isSelected);
    previousSelectedId.value = id;
    emits(
        "selectionChanged",
        [...dropdownItems.value.keys()],
        isSelected ? [id] : [],
        isSelected ? [] : [id]
    );
}
</script>

<style scoped>
.dropdown {
    display: grid;
    grid-template-rows: auto 1fr;
}
</style>
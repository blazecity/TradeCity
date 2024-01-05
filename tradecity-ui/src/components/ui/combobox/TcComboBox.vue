<template>
    <div :id="uuid" class="inline-block relative text-normal">
        <div class="flex items-center gap-2">
            <span v-if="withLabel" class="whitespace-nowrap">{{ placeholder }}</span>
            <div :class="['flex items-center justify-between bg-dark px-1 py-px w-full', {' standard-border': !forTable}]">
                <div class="flex gap-1 overflow-x-auto scrollbar">
                    <tc-combo-box-selected-item v-if="numberOfSelectedItems > 0">
                        {{ firstSelectedItem?.label }}
                    </tc-combo-box-selected-item>
                    <tc-combo-box-selected-item v-else-if="numberOfSelectedItems > 1">
                        +{{ numberOfSelectedItems - 1 }}
                    </tc-combo-box-selected-item>
                    <span v-else class="text-gray-400">{{ placeholder }}</span>
                </div>
                <tc-icon class="large-icon ml-1" :icon="expanded ? 'north' : 'south'" clickable @click="expandClickHandler" />
            </div>
        </div>
        <!-- dropdown -->
        <div v-if="expanded" class="dropdown absolute standard-border p-1 mt-1 bg-dark w-96 max-h-80 overflow-hidden z-10">
            <!-- dropdown action bar -->
            <div class="flex items-center gap-1 mb-1.5">
                <tc-string-input class="flex-grow" v-model="searchTerm" placeholder="Search"/>
                <tc-button v-if="multiSelect" text="Select all" @click="selectAllClickHandler"/>
                <tc-button v-if="multiSelect" text="Remove all" @click="removeAllClickHandler" dangerous/>
            </div>
            <div class="overflow-auto h-full">
                <div v-for="([item, isSelected], index) in displayedDropdownItems" :key="index"
                     class="flex items-center px-0.5">
                    <tc-check-box :model-value="isSelected"
                                  @update:model-value="isNowSelected => selectedClickHandler(item, isNowSelected)"/>
                    <div class="flex items-center flex-grow standard-hover rounded-sm px-1 ml-1"
                         @click="() => selectedClickHandler(item, !isSelected)">
                        <span>{{ item.label }}</span>
                        <slot :item="item"></slot>
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
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import TcCheckBox from "@/components/ui/input/TcCheckBox.vue";
import {useSearch} from "@/components/ui/combobox/index";
import type {ComboBoxItem} from "@/components/ui/combobox/index";
import {useClickContext} from "@/stores/clickcontext";

type TcComboBoxProps = {
    items: Array<ComboBoxItem<T>>;
    placeholder: string;
    level?: number;
    multiSelect?: boolean;
    withLabel?: boolean;
    forTable?: boolean;
}
const props = withDefaults(defineProps<TcComboBoxProps>(), {
    level: 0
});

type ComboBoxItems<T> = Array<ComboBoxItem<T>>;
type TcComboBoxEmits = {
    (e: "selectionChanged", currentSelection: ComboBoxItems<T>, selectionAdded: ComboBoxItems<T>, selectionRemoved: ComboBoxItems<T>): void;
}
const emits = defineEmits<TcComboBoxEmits>();

const {registerHandler} = useClickContext();
const searchDb = useSearch(props.items);

const uuid = crypto.randomUUID();
const expanded = ref(false);
const searchTerm = ref("");
const dropdownItems = ref(new Map(props.items.map(item => [item, false])));
const displayedDropdownItems = ref(dropdownItems.value);
const numberOfSelectedItems = computed(() => [...dropdownItems.value.values()].filter(isSelected => isSelected).length);
const firstSelectedItem = computed(() => [...dropdownItems.value.entries()].find(([, isSelected]) => isSelected)?.[0]);
const lastSelectedItem = ref<ComboBoxItem<T>>();
watch(searchTerm, async val => {
    if (val === "") {
        displayedDropdownItems.value = dropdownItems.value;
        return;
    }
    const searchResult = await searchDb.value(val);
    displayedDropdownItems.value = new Map([...dropdownItems.value.entries()].filter(([item]) => searchResult.includes(item.id)));
}, {immediate: true});

registerHandler(uuid, props.level, () => {
    if (expanded.value) {
        expanded.value = false;
        return true;
    }

    return false;
});

// ========== EVENT HANDLERS ==========
function expandClickHandler(): void {
    expanded.value = !expanded.value;
}

function selectAllClickHandler(): void {
    const selectionAdded: ComboBoxItems<T> = [];
    dropdownItems.value.forEach((isSelected, item) => {
        if (!isSelected) {
            selectionAdded.push(item);
            dropdownItems.value.set(item, true);
        }
    });
    emits("selectionChanged", [...dropdownItems.value.keys()], selectionAdded, []);
}

function removeAllClickHandler(): void {
    const selectionRemoved: ComboBoxItems<T> = [];
    dropdownItems.value.forEach((isSelected, item) => {
        if (isSelected) {
            selectionRemoved.push(item);
            dropdownItems.value.set(item, false);
        }
    });
    emits("selectionChanged", [...dropdownItems.value.keys()], [], selectionRemoved);
}

function selectedClickHandler(item: ComboBoxItem<T>, isSelected: boolean): void {
    if (!props.multiSelect && lastSelectedItem.value && isSelected) {
        dropdownItems.value.set(lastSelectedItem.value, false);
    }

    dropdownItems.value.set(item, isSelected);
    lastSelectedItem.value = item;
    emits(
        "selectionChanged",
        [...dropdownItems.value.keys()],
        isSelected ? [item] : [],
        isSelected ? [] : [item]
    );
}
</script>

<style scoped>
.dropdown {
    display: grid;
    grid-template-rows: auto 1fr;
}
</style>
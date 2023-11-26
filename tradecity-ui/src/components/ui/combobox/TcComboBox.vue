<template>
  <div class="inline-block relative">
    <div class="flex items-center justify-between standard-border bg-secondary px-1 py-px w-full">
      <!-- search field -->
      <div class="flex gap-1 overflow-x-auto scrollbar">
        <tc-combo-box-selected-item v-if="numberOfSelectedItems > 0" :item="firstSelectedItem">
          <slot name="selected-item" :item="firstSelectedItem"></slot>
        </tc-combo-box-selected-item>
        <tc-combo-box-selected-item v-if="numberOfSelectedItems > 1" :item="firstSelectedItem">
          +{{ numberOfSelectedItems - 1 }}
        </tc-combo-box-selected-item>
      </div>
      <tc-icon class="large-icon ml-1" :icon="expanded ? 'north' : 'south'" clickable @click="expandClickHandler" />
    </div>
    <!-- dropdown -->
    <div v-if="expanded" class="inline-block absolute standard-border p-1 mt-1 bg-secondary w-96">
      <!-- dropdown action bar -->
      <div class="flex items-center gap-1 mb-1.5">
        <tc-string-input class="flex-grow" v-model="searchTerm" placeholder="Search" />
        <tc-button text="Select all" @click="selectAllClickHandler" />
        <tc-button text="Remove all" @click="removeAllClickHandler" dangerous />
      </div>
      <div v-for="([item, isSelected], index) in dropdownItems" :key="index" class="flex items-center px-0.5">
        <tc-check-box :model-value="isSelected" @update:model-value="isNowSelected => selectedClickHandler(item, isNowSelected)" />
        <div class="flex-grow standard-hover rounded-sm px-1 ml-1" @click="() => selectedClickHandler(item, !isSelected)">
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import {computed, ref, watch} from "vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcComboBoxSelectedItem from "@/components/ui/combobox/TcComboBoxSelectedItem.vue";
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import TcCheckBox from "@/components/ui/input/TcCheckBox.vue";

type TcComboBoxProps = {
  items: Array<T>,
  multiSelect?: boolean
}
const props = defineProps<TcComboBoxProps>();

type TcComboBoxEmits = {
  (e: "selectionChanged", currentSelection: Array<T>, selectionAdded: Array<T>, selectionRemoved: Array<T>): void;
}
const emits = defineEmits<TcComboBoxEmits>();

const expanded = ref(true);
const searchTerm = ref("");
const dropdownItems = ref(new Map(props.items.map(item => [item, false])));
const numberOfSelectedItems = computed(() => [...dropdownItems.value.values()].filter(isSelected => isSelected).length);
const firstSelectedItem = computed(() =>
    [...dropdownItems.value.entries()].find(([_, isSelected]) => isSelected)?.[0]
)
watch(searchTerm, val => console.log("SearchTerm: ", val), {immediate: true});

// ========== EVENT HANDLERS ==========
function expandClickHandler(): void {
  expanded.value = !expanded.value;
}

function selectAllClickHandler(): void {
  const selectionAdded: Array<T> = [];
  dropdownItems.value.forEach((isSelected, item) => {
    if (!isSelected) {
      selectionAdded.push(item);
      dropdownItems.value.set(item, true);
    }
  });
  emits("selectionChanged", [...dropdownItems.value.keys()], selectionAdded, []);
}

function removeAllClickHandler(): void {
  const selectionRemoved: Array<T> = [];
  dropdownItems.value.forEach((isSelected, item) => {
    if (isSelected) {
      selectionRemoved.push(item);
      dropdownItems.value.set(item, false);
    }
  });
  emits("selectionChanged", [...dropdownItems.value.keys()], [], selectionRemoved);
}

function selectedClickHandler(item: T, isSelected: boolean): void {
  dropdownItems.value.set(item, isSelected);
  emits(
      "selectionChanged",
      [...dropdownItems.value.keys()],
      isSelected ? [item] : [],
      isSelected ? [] : [item]
  );
}
</script>

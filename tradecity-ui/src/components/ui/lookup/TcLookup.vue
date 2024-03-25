<template>
  <div :class="['flex items-center rounded-sm py-px pr-1', dark ? 'bg-input-dark' : 'bg-input']">
    <input
        type="text" :placeholder="placeholder" v-model="inputValue" class="bg-transparent px-1.5 py-px w-full outline-none"
        @keyup.enter="handleEnterClick"
    >
    <tc-icon icon="search" class="large-icon"/>
  </div>
</template>

<script setup lang="ts" generic="T">
import {ref} from "vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import type {SearchCallback} from "@/components/common/lookup";
import {useBrowserWindow} from "@/composables/window";
import type {TableHeaderGroups} from "@/components/ui/table";

/*
- If there is one search result, the onSearch-Event should return the value and display the value in the input field
- if there are multiple result, then the modal should open and display the values in a table.
- if there is no result, then input should flash red

example usage:
TcClientLookup.vue

<tc-lookup @search-enter="executeSearch">
    <tc-table></tc-table>
</tc-lookup>

executeSearch = searchVal => search(searchVal) then display the results in table
 */

type TcLookupProps = {
  placeholder: string;
  lookupWindowPath: string;
  tableConfiguration: TableHeaderGroups<T>; // generate table from within the component, no outside slot needed
  dark?: boolean;
};
const props = defineProps<TcLookupProps>();

type TcLookupEmits = {
  searchEnter: [searchInput: string, searchHandler: SearchCallback];
};
const emits = defineEmits<TcLookupEmits>();

const inputValue = ref("");

const openWindow = useBrowserWindow<string>(props.lookupWindowPath, console.log);
const windowOpen = ref(false);

// =========== EVENT HANDLERS ===========

function handleEnterClick(): void {
  emits("searchEnter", inputValue.value, handleSearch);
}

function handleSearch(resultCount: number, displayPropertyFn?: () => string): void {
  if (resultCount === 1 && displayPropertyFn) {
    inputValue.value = displayPropertyFn();
    return;
  }

  if (resultCount > 1) {
    openWindow().match(
        ({channel, appWindow}) => {
          // set the channel in a variable
          // handle closing of channel
          // if channel is open, send new search value to channel, so that the search function can handle it.
          windowOpen.value = true;
        },
        () => {}
    );
    return;
  }

  openWindow();
  // handle error case
}
</script>

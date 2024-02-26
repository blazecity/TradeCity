<template>
    <div class="flex items-center standard-border bg-dark py-px pr-0.5">
        <input
            type="text" :placeholder="placeholder" v-model="inputValue" class="bg-dark px-1.5 w-full outline-none"
            @keyup.enter="handleEnterClick"
        >
        <tc-icon icon="search" class="large-icon" />
        <tc-dialog :title="placeholder" v-model:open="dialogOpen">
            <slot></slot>
        </tc-dialog>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcDialog from "@/components/ui/dialog/TcDialog.vue";
import type {SearchCallback} from "@/components/common/lookup";
import {useBrowserWindow} from "@/composables/window";

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
};
const props = defineProps<TcLookupProps>();

type TcLookupEmits = {
    searchEnter: [searchInput: string, searchHandler: SearchCallback];
};
const emits = defineEmits<TcLookupEmits>();

const inputValue = ref("");
const dialogOpen = ref(false);

const open = useBrowserWindow("/client_search", console.log);

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
        dialogOpen.value = true;
        return;
    }

    // handle error case
}
</script>

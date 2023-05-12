<template>
<div class="relative">
    <div class="flex bg-primary p-0.5 rounded text-sm text-neutral-100 h-7">
        <input @input="search" v-model="text" placeholder="Search" type="text" :class="['bg-primary outline-none mr-3 ml-1 transition-width duration-400', text.length === 0 ? 'w-32' : 'w-56']" autocomplete="new-password">
        <search-icon v-if="text.length === 0" styles="ml-auto mr-1 fill-white" :height="20" :width="20" />
        <close-icon v-else styles="ml-auto mr-1 hover:cursor-pointer fill-white" @click="resetText" :height="20" :width="20" />
    </div>
    <div v-if="searchResults.length > 0" class="absolute bg-primary mt-1 p-1 rounded w-full">
        <div v-for="resultGroup in searchResults">
            <span class="m-1 font-bold">{{ resultGroup.group }}</span>
            <tc-search-result @click="selectFunctionality(result)" v-for="result in resultGroup.elements" :name="result.functionality" :description="result.description"></tc-search-result>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchIcon from '../../icons/SearchIcon.vue';
import CloseIcon from '../../icons/CloseIcon.vue';
import { useEventBus, useModuleIndex } from '../../../utils/store';
import { SearchResultDocument } from '../../nav/modules';
import TcSearchResult from './TcSearchResult.vue';
import { storeToRefs } from 'pinia';
import { Topics } from '../../../utils/eventbus';

const text = ref("");

interface SearchResultGroup {
    group: string,
    elements: Array<SearchResultDocument>
}

const searchResults = ref<Array<SearchResultGroup>>([]);

const store = useModuleIndex();
const { searchFor, modules } = store;
const { selectedModule, selectedFunctionality } = storeToRefs(store);
const { booleanEventBus } = useEventBus();

booleanEventBus.subscribe(Topics.ESCAPE_CLICKED, () => resetText());
booleanEventBus.subscribe(Topics.OUTSIDE_CLICK, () => resetText());

function search(): void {
    searchFor(text.value, results => {
        if (results.length === 0) {
            searchResults.value = [];
        }

        const grouped = new Map<string, SearchResultGroup>();    
        results.forEach(result => {
            if (grouped.has(result.moduleId)) grouped.get(result.moduleId)?.elements.push(result)
            else grouped.set(result.moduleId, {
                group: result.module,
                elements: new Array(result)
            })
        });

        searchResults.value = new Array(...grouped.values());
    });
}

function resetText(): void {
    text.value = "";
    searchResults.value = [];
}

function selectFunctionality(result: SearchResultDocument): void {
    const mod = modules[result.moduleId];
    selectedModule.value = [result.moduleId, mod];
    selectedFunctionality.value = [result.funcId, mod.groups[result.groupId].functionalities[result.funcId]];
}
</script>

<style scoped>

</style>
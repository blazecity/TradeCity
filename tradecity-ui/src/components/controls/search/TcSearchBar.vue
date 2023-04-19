<template>
<div class="relative">
    <div class="flex bg-primary p-0.5 rounded text-sm text-neutral-100 h-7">
        <input @input="search" v-model="text" placeholder="Search" type="text" :class="['bg-primary outline-none mr-3 ml-1 transition-width duration-400', text.length === 0 ? 'w-32' : 'w-56']" autocomplete="new-password">
        <search-icon v-if="text.length === 0" styles="ml-auto mr-1 fill-white" :height="20" :width="20" />
        <close-icon v-else styles="ml-auto mr-1 hover:cursor-pointer fill-white" @click="resetText" :height="20" :width="20" />
    </div>
    <div v-if="searchResults.size > 0" class="absolute bg-primary mt-1 p-1 rounded w-full">
        <div v-for="resultGroup in searchResults">
            <span class="m-1">{{ resultGroup.group }}</span>
            <tc-search-result @click="selectFunctionality(result.funcId)" v-for="result in resultGroup.elements" :name="result.functionality" :description="result.description"></tc-search-result>
        </div>
        
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchIcon from '../../icons/SearchIcon.vue';
import CloseIcon from '../../icons/CloseIcon.vue';
import { useModuleIndex } from '../../../utils/store';
import { List } from 'immutable';
import { SearchResultDocument } from '../../../utils/modules';
import TcSearchResult from './TcSearchResult.vue';
import { useEventBus } from '../../../utils/store';
import { EventMessage } from '../../../utils/eventbus';

const text = ref("");

interface SearchResultGroup {
    group: string,
    elements: Array<SearchResultDocument>
}

const searchResults = ref<List<SearchResultGroup>>(List());

const { searchFor } = useModuleIndex();

function search(): void {
    searchFor(text.value, results => {
        if (results.size === 0) {
            searchResults.value = List<SearchResultGroup>();
        }

        const grouped = new Map<string, SearchResultGroup>();    
        results.forEach(result => {
            if (grouped.has(result.moduleId)) grouped.get(result.moduleId)?.elements.push(result)
            else grouped.set(result.moduleId, {
                group: result.module,
                elements: new Array(result)
            })
        });

        searchResults.value = List(grouped.values());
    });
}

function resetText(): void {
    text.value = "";
    searchResults.value = List<SearchResultGroup>();
}

function selectFunctionality(id: string): void {
    const { stringEventBus } = useEventBus();
    stringEventBus.emit("functionality_selected", new EventMessage("tc_search_bar", id));
}
</script>

<style scoped>

</style>
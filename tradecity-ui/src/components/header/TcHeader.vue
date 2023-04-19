<template>
<header class="flex py-2 px-4 border-b-[1px] border-b-zinc-900 shadow-sm items-center">
    <label-icon styles="fill-white mr-2" :height="30" :width="30" />
    <span class="text-lg font-bold mr-auto">{{ title }}</span>
    <tc-search-bar />
</header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEventBus } from '../../utils/store';
import TcSearchBar from '../controls/search/TcSearchBar.vue';
import LabelIcon from '../icons/LabelIcon.vue';
import { applicationName } from '../../utils/constants';

const title = ref(applicationName);
const { stringEventBus, booleanEventBus } = useEventBus();
stringEventBus.subscribe("functionality_selected_name", eventMessage => title.value = eventMessage.payload);
booleanEventBus.subscribe("homeModuleSelected", eventMessage => {
    if (eventMessage.payload) title.value = applicationName;
})
</script>
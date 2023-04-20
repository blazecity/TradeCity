<template>
<header :class="['flex h-full border-b-[1px] border-b-zinc-900 shadow-sm items-center bg-tertiary', styles]">
    <div class="flex py-1 items-center min-w-[14rem] px-2 bg-tertiary">
        <span>{{ moduleTitle }}</span>
        <clickable-icon styles="ml-auto" @click="hideFunctionalityBar">
            <hide-icon v-if="functionalitiesVisible" styles="fill-white" :height="17" :width="17" />
            <open-full-icon v-else styles="fill-white" :height="17" :width="17" />
        </clickable-icon>
    </div>
    <div class="flex justify-between w-full px-2 py-1 bg-background-main">
        <label-icon styles="fill-white mr-2" :height="30" :width="30" />
        <span class="text-lg font-bold mr-auto">{{ functionalityTitle }}</span>
        <tc-search-bar />
    </div>
</header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEventBus } from '../../utils/store';
import TcSearchBar from '../controls/search/TcSearchBar.vue';
import LabelIcon from '../icons/LabelIcon.vue';
import ClickableIcon from '../icons/ClickableIcon.vue';
import HideIcon from '../icons/HideIcon.vue';
import OpenFullIcon from '../icons/OpenFullIcon.vue';
import { applicationName, defaultFunctionalitiesVisible } from '../../utils/constants';
import { EventMessage } from '../../utils/eventbus';

interface TcHeaderProps {
    styles?: string
}

defineProps<TcHeaderProps>();

const functionalityTitle = ref(applicationName);
const moduleTitle = ref(applicationName);
const functionalitiesVisible = ref(defaultFunctionalitiesVisible);

const { stringEventBus, booleanEventBus } = useEventBus();
stringEventBus.subscribe("module_selected_name", eventMessage => moduleTitle.value = eventMessage.payload);
stringEventBus.subscribe("functionality_selected_name", eventMessage => functionalityTitle.value = eventMessage.payload);
booleanEventBus.subscribe("homeModuleSelected", eventMessage => eventMessage.payload ? functionalityTitle.value = applicationName : eventMessage.payload );
booleanEventBus.subscribe("functionality_bar_visible", eventMessage => functionalitiesVisible.value = eventMessage.payload);

function hideFunctionalityBar(): void {
    functionalitiesVisible.value = !functionalitiesVisible.value;
    booleanEventBus.emit("functionality_bar_visible", new EventMessage("", functionalitiesVisible.value));
}
</script>
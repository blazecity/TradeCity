<template>
<header :class="['flex h-full border-b-[1px] border-b-zinc-900 shadow-sm items-center bg-tertiary', styles]">
    <div class="flex py-1 items-center min-w-[12rem] px-2 bg-tertiary">
        <span class="font-bold">{{ moduleTitle }}</span>
        <clickable-icon styles="ml-auto" @click="hideFunctionalityBar">
            <hide-icon v-if="functionalitiesVisible" styles="fill-white" :height="17" :width="17" />
            <open-full-icon v-else styles="fill-white" :height="17" :width="17" />
        </clickable-icon>
    </div>
    <div class="flex justify-between items-center w-full px-2 py-1 bg-background-main">
        <label-icon styles="fill-white mr-2" :height="30" :width="30" />
        <span class="text-lg font-bold mr-auto">{{ functionalityTitle }}</span>
        <tc-search-bar />
        <clickable-icon class="ml-5" @click="openWindow" title="Open new window">
            <open-in-new-icon styles="fill-white h-5 w-5"></open-in-new-icon>
        </clickable-icon>
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
import OpenInNewIcon from '../icons/OpenInNewIcon.vue';
import { applicationName, defaultFunctionalitiesVisible } from '../../utils/constants';
import { EventMessage, Topics } from '../../utils/eventbus';

interface TcHeaderProps {
    styles?: string
}

defineProps<TcHeaderProps>();

const functionalityTitle = ref(applicationName);
const moduleTitle = ref(applicationName);
const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const openWindow = () => window.open(window.location.href, "_blank", "location=0");

const { stringEventBus, booleanEventBus } = useEventBus();
stringEventBus.subscribe(Topics.MODULE_SELECTED_NAME, eventMessage => moduleTitle.value = eventMessage.payload);
stringEventBus.subscribe(Topics.FUNCTIONALITY_SELECTED_NAME, eventMessage => functionalityTitle.value = eventMessage.payload);
booleanEventBus.subscribe(Topics.HOME_MODULE_SELECTED, eventMessage => eventMessage.payload ? functionalityTitle.value = applicationName : eventMessage.payload );
booleanEventBus.subscribe(Topics.FUNCTIONALITY_BAR_VISIBLE, eventMessage => functionalitiesVisible.value = eventMessage.payload);

function hideFunctionalityBar(): void {
    functionalitiesVisible.value = !functionalitiesVisible.value;
    booleanEventBus.emit(Topics.FUNCTIONALITY_BAR_VISIBLE, new EventMessage("", functionalitiesVisible.value));
}
</script>
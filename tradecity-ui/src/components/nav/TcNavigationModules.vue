<template>
<nav class="bg-primary h-full p-0.5">
    <!-- TODO: Modules to separate component -->
    <tc-navigation-icon @click="selectHomeModule()" text="Home" :is-selected="isModuleSelected(defaultModuleIndex)" :has-border="false">
        <swap-icon />
    </tc-navigation-icon>
    <div class="h-0.5 ml-3.5 mr-2 bg-tertiary"></div>
    <tc-navigation-icon v-for="(module, index) in modules" :text="module.name" @click="setSelectedModule(index)" :is-selected="isModuleSelected(index)">
        <component :is="module.iconComponent"></component>
    </tc-navigation-icon>
</nav>
</template>

<script setup lang="ts">import { ref } from 'vue';
import { useEventBus, useModuleIndex } from '../../utils/store';
import { EventMessage, Topics } from '../../utils/eventbus';
import TcNavigationIcon from './TcNavigationIcon.vue';
import SwapIcon from '../icons/SwapIcon.vue';

const { modules } = useModuleIndex();
const defaultModuleIndex = -1;
const selectedModuleIndex = ref(defaultModuleIndex);
const { numberEventBus, stringEventBus, booleanEventBus } = useEventBus();

function setSelectedModule(index: number): void {
    selectedModuleIndex.value = index;
    numberEventBus.emit(Topics.FUNCTIONALITY_GROUP_INDEX_CHANGED, new EventMessage("", index));
    stringEventBus.emit(Topics.MODULE_SELECTED_NAME, new EventMessage("", modules[index]?.name ?? ""));
    booleanEventBus.emit(Topics.FUNCTIONALITY_BAR_VISIBLE, new EventMessage("", true));
}

function selectHomeModule(): void {
    selectedModuleIndex.value = -1;
    const { booleanEventBus } = useEventBus();
    booleanEventBus.emit(Topics.HOME_MODULE_SELECTED, new EventMessage("tc_navigation_hs_selected", true));
}

function isModuleSelected(index: number): boolean {
    return selectedModuleIndex.value === index;
}
</script>
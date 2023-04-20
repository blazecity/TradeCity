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
import { EventMessage } from '../../utils/eventbus';
import TcNavigationIcon from './TcNavigationIcon.vue';
import SwapIcon from '../icons/SwapIcon.vue';

const { modules } = useModuleIndex();
const defaultModuleIndex = -1;
const selectedModuleIndex = ref(defaultModuleIndex);
const { numberEventBus, stringEventBus, booleanEventBus } = useEventBus();

function setSelectedModule(index: number): void {
    selectedModuleIndex.value = index;
    numberEventBus.emit("functionality_group_index_changed", new EventMessage("", index));
    stringEventBus.emit("module_selected_name", new EventMessage("", modules.get(index)?.name ?? ""));
    booleanEventBus.emit("functionality_bar_visible", new EventMessage("", true));
}

function selectHomeModule(): void {
    selectedModuleIndex.value = -1;
    const { booleanEventBus } = useEventBus();
    booleanEventBus.emit("homeModuleSelected", new EventMessage("tc_navigation_hs_selected", true));
}

function isModuleSelected(index: number): boolean {
    return selectedModuleIndex.value === index;
}
</script>
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
<div :class="['bg-secondary min-w-[14rem]', functionalitiesVisible ? 'visible' : 'hidden']">
    <div class="flex items-center border-b-[1px] border-b-zinc-900 shadow-sm">
        <div class="pl-3 pr-1 pb-3 pt-2.5 font-bold">{{ getSelectedModuleName() }}</div>
        <clickable-icon styles="ml-auto" @click="">
            <hide-icon styles="fill-white" :height="20" :width="20" />
        </clickable-icon>
    </div>
    <tc-navigation-functionality-group v-for="functionalityGroup in functionalityGroups" :name="functionalityGroup.name" :key="functionalityGroup.id">
        <tc-navigation-functionality v-for="functionality in functionalityGroup.functionalities" :functionality="functionality" :key="functionality.id"/>
    </tc-navigation-functionality-group>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TcNavigationIcon from './TcNavigationIcon.vue';
import TcNavigationFunctionality from './TcNavigationFunctionality.vue';
import TcNavigationFunctionalityGroup from './TcNavigationFunctionalityGroup.vue';
import SwapIcon from '../icons/SwapIcon.vue';
import HideIcon from '../icons/HideIcon.vue';
import ClickableIcon from '../icons/ClickableIcon.vue';
import { useModuleIndex, useEventBus } from '../../utils/store';
import { ModuleFunctionalityGroup } from '../../utils/modules';
import { List } from 'immutable';
import { EventMessage } from '../../utils/eventbus';
import { applicationName } from '../../utils/constants';

const { modules } = useModuleIndex();
const defaultModuleIndex = -1;
const selectedModuleIndex = ref(defaultModuleIndex);
const functionalityGroups = ref<List<ModuleFunctionalityGroup>>(List());
const functionalitiesVisible = ref(true);

function setSelectedModule(index: number): void {
    selectedModuleIndex.value = index;
    const module = modules[index];
    functionalityGroups.value = module.functionalities;
}

function selectHomeModule(): void {
    selectedModuleIndex.value = -1;
    functionalityGroups.value = List<ModuleFunctionalityGroup>();
    const { booleanEventBus } = useEventBus();
    booleanEventBus.emit("homeModuleSelected", new EventMessage("tc_navigation_hs_selected", true));
}

function isModuleSelected(index: number): boolean {
    return selectedModuleIndex.value === index;
}

function getSelectedModuleName(): string {
    if (selectedModuleIndex.value === defaultModuleIndex) return applicationName;
    return modules[selectedModuleIndex.value].name;
}
</script>

<style scoped>

</style>
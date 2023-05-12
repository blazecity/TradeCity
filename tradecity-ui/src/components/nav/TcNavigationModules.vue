<template>
<nav class="bg-primary h-full p-0.5">
    <template v-for="[index, moduleTree] of Object.values(moduleTrees).entries()">
        <tc-navigation-icon v-for="[moduleKey, module] in Object.entries(moduleTree)" @click="setSelectedModule(moduleKey, module)" :text="module.name" :is-selected="selectedModule[0] === moduleKey">
            <component :is="module.iconComponent"></component>
        </tc-navigation-icon>
        <div v-if="index < Object.values(moduleTrees).length - 1" class="h-0.5 ml-3.5 mr-2 bg-tertiary"></div>
    </template>
</nav>
</template>

<script setup lang="ts">
import { useEventBus, useModuleIndex } from '../../utils/store';
import { EventMessage, Topics } from '../../utils/eventbus';
import TcNavigationIcon from './TcNavigationIcon.vue';
import { storeToRefs } from 'pinia';
import { Module } from './modules';

const store = useModuleIndex();
const { modules, specialModules } = store;
const moduleTrees = {
    specialModules,
    modules
}
const { selectedModule } = storeToRefs(store);
const { booleanEventBus } = useEventBus();


function setSelectedModule(moduleKey: string, module: Module): void {
    selectedModule.value = [moduleKey, module];
    booleanEventBus.emit(Topics.FUNCTIONALITY_BAR_VISIBLE, new EventMessage("", true));
}
</script>
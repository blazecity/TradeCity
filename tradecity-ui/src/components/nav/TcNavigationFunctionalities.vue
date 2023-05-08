<template>
<div :class="['bg-tertiary min-w-[12rem]', functionalitiesVisible ? 'visible' : 'hidden']">
    <tc-navigation-functionality-group v-for="functionalityGroup in functionalityGroups" :name="functionalityGroup.name" :key="functionalityGroup.id">
        <tc-navigation-functionality v-for="functionality in functionalityGroup.functionalities" :functionality="functionality" :key="functionality.id"/>
    </tc-navigation-functionality-group>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TcNavigationFunctionality from './TcNavigationFunctionality.vue';
import TcNavigationFunctionalityGroup from './TcNavigationFunctionalityGroup.vue';
import { ModuleFunctionalityGroup } from './modules';
import { useEventBus, useModuleIndex } from '../../utils/store';
import { defaultFunctionalitiesVisible } from '../../utils/constants';
import { Topics } from '../../utils/eventbus';

const functionalityGroups = ref<Array<ModuleFunctionalityGroup>>();
const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const { numberEventBus, booleanEventBus } = useEventBus();
const { modules } = useModuleIndex();
numberEventBus.subscribe(Topics.FUNCTIONALITY_GROUP_INDEX_CHANGED, eventMessage => functionalityGroups.value = modules[eventMessage.payload]?.functionalities ?? []);
booleanEventBus.subscribe(Topics.FUNCTIONALITY_BAR_VISIBLE, eventMessage => functionalitiesVisible.value = eventMessage.payload);
</script>
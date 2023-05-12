<template>
<div :class="['bg-tertiary min-w-[12rem]', functionalitiesVisible ? 'visible' : 'hidden']">
    <tc-navigation-functionality-group v-for="[groupKey, group] in Object.entries(selectedModule[1].groups)" :name="group.name" :key="groupKey">
        <tc-navigation-functionality v-for="[funcKey, func] in Object.entries(group.functionalities)" :functionality="[funcKey, func]" :key="funcKey"/>
    </tc-navigation-functionality-group>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TcNavigationFunctionality from './TcNavigationFunctionality.vue';
import TcNavigationFunctionalityGroup from './TcNavigationFunctionalityGroup.vue';
import { useEventBus, useModuleIndex } from '../../utils/store';
import { defaultFunctionalitiesVisible } from '../../utils/constants';
import { Topics } from '../../utils/eventbus';
import { storeToRefs } from 'pinia';

const { selectedModule } = storeToRefs(useModuleIndex());
const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const { booleanEventBus } = useEventBus();

booleanEventBus.subscribe(Topics.FUNCTIONALITY_BAR_VISIBLE, eventMessage => functionalitiesVisible.value = eventMessage.payload);
</script>
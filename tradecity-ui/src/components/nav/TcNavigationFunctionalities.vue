<template>
<div :class="['bg-tertiary min-w-[14rem]', functionalitiesVisible ? 'visible' : 'hidden']">
    <tc-navigation-functionality-group v-for="functionalityGroup in functionalityGroups" :name="functionalityGroup.name" :key="functionalityGroup.id">
        <tc-navigation-functionality v-for="functionality in functionalityGroup.functionalities" :functionality="functionality" :key="functionality.id"/>
    </tc-navigation-functionality-group>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TcNavigationFunctionality from './TcNavigationFunctionality.vue';
import TcNavigationFunctionalityGroup from './TcNavigationFunctionalityGroup.vue';
import { ModuleFunctionalityGroup } from '../../utils/modules';
import { useEventBus, useModuleIndex } from '../../utils/store';
import { defaultFunctionalitiesVisible } from '../../utils/constants';

const functionalityGroups = ref<Array<ModuleFunctionalityGroup>>();
const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const { numberEventBus, booleanEventBus } = useEventBus();
const { modules } = useModuleIndex();
numberEventBus.subscribe("functionality_group_index_changed", eventMessage => functionalityGroups.value = modules[eventMessage.payload]?.functionalities ?? []);
booleanEventBus.subscribe("functionality_bar_visible", eventMessage => functionalitiesVisible.value = eventMessage.payload);
</script>
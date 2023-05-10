<template>
<div class="flex h-full w-full">
  <tc-navigation-modules />
  <div class="grid grid-template flex-auto h-full">
    <tc-header styles="col-span-2" />
    <tc-navigation-functionalities />
    <main :class="['h-full bg-background-main p-1.5 min-h-0', !functionalitiesVisible ? 'col-span-full' : '']">
      <tc-table :table-configuration="config"></tc-table>
    </main>
  </div>
</div>
</template>

<script setup lang="ts">
import TcNavigationModules from '../nav/TcNavigationModules.vue';
import TcNavigationFunctionalities from '../nav/TcNavigationFunctionalities.vue';
import TcHeader from '../header/TcHeader.vue';
import TcTable from '../controls/table/TcTable.vue';
import { useEventBus } from '../../utils/store';
import { ref } from 'vue';
import { defaultFunctionalitiesVisible } from '../../utils/constants';
import { TcTableConfig } from '../controls/table/table';

const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const { booleanEventBus } = useEventBus();
booleanEventBus.subscribe("functionality_bar_visible", eventMessage => functionalitiesVisible.value = eventMessage.payload);

const config = new TcTableConfig("ID", "Test", [
  { a: 1, b: 2, c: 3 },
  { a: 3, b: 4, c: 5 }
], {
 "group1": {
    isGrouped: false,
    elements: {
      a: TcTableConfig.defaultColumnOptions,
      b: {
        name: "Hello",
        mutable: true
      },
    },
    name: "Group1"
 },
 "group2": {
    isGrouped: true,
    elements: {
      a: TcTableConfig.defaultColumnOptions,
      b: TcTableConfig.defaultColumnOptions,
    },
    name: "Group2"
 },
}, console.log)
</script>

<style scoped>
.grid-template {
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
}
</style>
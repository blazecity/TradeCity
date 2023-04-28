<template>
<div class="flex h-full w-full">
  <tc-navigation-modules />
  <div class="grid grid-template flex-auto h-full">
    <tc-header styles="col-span-2" />
    <tc-navigation-functionalities />
    <main :class="['grid grid-cols-6 grid-rows-6 h-full gap-px bg-background-main p-1.5 min-h-0', !functionalitiesVisible ? 'col-span-full' : '']">
      <tc-panel title="Test Panel" :cols="6" :rows="7">
        <tc-table :table-configuration="table" styles="col-span-full row-span-full"></tc-table>
      </tc-panel>
    </main>
  </div>
</div>
</template>

<script setup lang="ts">
import TcNavigationModules from '../nav/TcNavigationModules.vue';
import TcNavigationFunctionalities from '../nav/TcNavigationFunctionalities.vue';
import TcHeader from '../header/TcHeader.vue';
import TcPanel from '../controls/panel/TcPanel.vue';
import TcTable from '../controls/table/TcTable.vue';
import { useEventBus } from '../../utils/store';
import { reactive, ref } from 'vue';
import { defaultFunctionalitiesVisible } from '../../utils/constants';
import { TcTableConfig } from '../controls/table/table';

const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const { booleanEventBus } = useEventBus();
booleanEventBus.subscribe("functionality_bar_visible", eventMessage => functionalitiesVisible.value = eventMessage.payload);

const table = reactive(new TcTableConfig("", "Some Table", [
  { field1: "text1", field2: true, field3: 1, field4: new Date(2022, 11, 0) },
  { field1: "text2", field2: false, field3: 2, field4: new Date(2022, 11, 2) },
  { field1: "text3", field2: true, field3: 3, field4: new Date(2022, 11, 3) },
  { field1: "text4", field2: false, field3: 4, field4: new Date(2022, 11, 4) },
  { field1: "text5", field2: true, field3: 5, field4: new Date(2022, 11, 5) },
  { field1: "text6", field2: false, field3: 6, field4: new Date(2022, 11, 6) },
  { field1: "text7", field2: true, field3: 7, field4: new Date(2022, 11, 7) },
], {
  field1: {
    name: "Field 1",
  },
  field2: {
    name: "Field 2",
  },
  field3: {
    name: "Field 3",
    mutable: true,
    decimalPoints: 3,
  },
  field4: {
    name: "Field 4",
    mutable: true
  }
}, console.log));
</script>

<style scoped>
.grid-template {
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
}
</style>
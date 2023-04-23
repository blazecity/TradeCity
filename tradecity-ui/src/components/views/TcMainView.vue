<template>
<div class="flex h-full w-full">
  <tc-navigation-modules />
  <div class="grid grid-template flex-auto">
    <tc-header styles="col-span-2" />
    <tc-navigation-functionalities />
    <main :class="['grid grid-cols-6 grid-rows-6 gap-px bg-background-main p-1', !functionalitiesVisible ? 'col-span-full' : '']">
        <tc-panel title="CHF Bond Pricing Panel" :cols="6" :rows="2">
          <tc-table :table-config="table"></tc-table>
        </tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="2">
          <tc-button text="Calculate" />
          <tc-input placeholder="Hello" type="string"></tc-input>
        </tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="2">Content 3</tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="2">Content 4</tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="2">Content 5</tc-panel>
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
import TcButton from '../controls/button/TcButton.vue';
import TcInput from '../controls/input/TcInput.vue';
import { useEventBus } from '../../utils/store';
import { ref } from 'vue';
import { defaultFunctionalitiesVisible } from '../../utils/constants';
import { List } from 'immutable';
import { TcTableConfig } from '../controls/table/table';
import { TableData } from '../../utils/types';

const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const { booleanEventBus } = useEventBus();
booleanEventBus.subscribe("functionality_bar_visible", eventMessage => functionalitiesVisible.value = eventMessage.payload);

interface SampleTable extends TableData {
  field1: string,
  field2: boolean,
  field3: number,
  field4: Date
}

const table = new TcTableConfig("", "", List<SampleTable>([
  { field1: "text1", field2: true, field3: 1, field4: new Date() },
  { field1: "text2", field2: false, field3: 2, field4: new Date() },
]), {
  field1: {
    name: "Field 1"
  },
  field2: {
    name: "Field 2"
  },
  field3: {
    name: "Field 3"
  },
  field4: {
    name: "Field 4"
  }
});
</script>

<style scoped>
.grid-template {
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
}
</style>
<template>
<div class="flex h-full w-full">
  <tc-navigation-modules />
  <div class="grid grid-template flex-auto h-full">
    <tc-header styles="col-span-2" />
    <tc-navigation-functionalities />
    <main :class="['grid grid-cols-6 grid-rows-6 h-full gap-px bg-background-main p-1.5 min-h-0', !functionalitiesVisible ? 'col-span-full' : '']">
      <tc-panel title="Test Panel" :cols="6" :rows="6">
        <div class="flex">
          <tc-combo-box :item-list="itemList" placeholder="Reaaaaalllllyy loooooonnnggggg placeholder" multi-select @selection-changed="selection"></tc-combo-box>
        </div>
        <span data-context="context1">Some span</span>
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
import TcButton from '../controls/button/TcButton.vue';
import TcComboBox from '../controls/combobox/TcComboBox.vue';
import { useEventBus } from '../../utils/store';
import { ref } from 'vue';
import { defaultFunctionalitiesVisible } from '../../utils/constants';
import { ComboBoxItemList } from '../controls/combobox/combobox';

const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const { booleanEventBus } = useEventBus();
booleanEventBus.subscribe("functionality_bar_visible", eventMessage => functionalitiesVisible.value = eventMessage.payload);

const itemList: ComboBoxItemList = {
  "item1": {
    name: "Item 1",
    tags: "tagity1"
  },
  "item2": {
    name: "Item 2",
    tags: "tagity1"
  },
  "item3": {
    name: "Item 3",
    tags: "tagity1"
  },
  "item4": {
    name: "Item 4",
    tags: "tagity1"
  },
  "item5": {
    name: "Item 5",
    tags: "tagity1"
  },
  "item6": {
    name: "Item 6",
    tags: "tagity1"
  },
}

const selection = (items: ComboBoxItemList) => console.log(items);

document.addEventListener("click", event => {
  console.log(event.target)
})
</script>

<style scoped>
.grid-template {
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
}
</style>
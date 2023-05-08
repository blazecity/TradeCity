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
        <span data-context="test">Some test</span>
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
import TcComboBox from '../controls/combobox/TcComboBox.vue';
import { useContextMenu, useEventBus } from '../../utils/store';
import { ref } from 'vue';
import { defaultFunctionalitiesVisible } from '../../utils/constants';
import { ComboBoxItemList } from '../controls/combobox/combobox';
import { TcContextMenuConfig } from '../controls/contextmenu/contextmenu';

const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const { booleanEventBus } = useEventBus();
booleanEventBus.subscribe("functionality_bar_visible", eventMessage => functionalitiesVisible.value = eventMessage.payload);

const config: TcContextMenuConfig = new TcContextMenuConfig("test", {
    "group1": {
        type: "submenu",
        items: [
            { id: "func1", name: "Function 1", callback: () => console.log("Function 1") },
            { id: "func2", name: "Function 2", callback: () => console.log("Function 2") },
            { id: "func3", name: "Function 3", callback: () => console.log("Function 3") },
        ],
        name: "Group 1"
    },
    "group2": {
        type: "submenu",
        items: [
            { id: "func4", name: "Function 4", callback: () => console.log("Function 4") },
            { id: "func5", name: "Function 5", callback: () => console.log("Function 5") },
            { id: "func6", name: "Function 6", callback: () => console.log("Function 6") },
        ],
        name: "Group 2"
    },
    "group3": {
        type: "single",
        items: [
            { id: "func8", name: "Function 7", callback: () => console.log("Function 7") },
            { id: "func8", name: "Function 8", callback: () => console.log("Function 8") },
            { id: "func9", name: "Function 9", callback: () => console.log("Function 9") },
        ],
        name: "Group 3"
    }
});

const { registerContextMenu } = useContextMenu();
registerContextMenu(config);

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
</script>

<style scoped>
.grid-template {
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
}
</style>
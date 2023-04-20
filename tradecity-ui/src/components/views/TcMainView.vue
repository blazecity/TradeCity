<template>
<div class="flex h-full w-full">
  <tc-navigation-modules />
  <div class="grid grid-template flex-auto">
    <tc-header styles="col-span-2" />
    <tc-navigation-functionalities />
    <main :class="['grid grid-cols-6 grid-rows-6 gap-px bg-background-main', !functionalitiesVisible ? 'col-span-full' : '']">
        <tc-panel title="CHF Bond Pricing Panel" :cols="6" :rows="2"></tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="2">Content 2</tc-panel>
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
import { useEventBus } from '../../utils/store';
import { ref } from 'vue';
import { defaultFunctionalitiesVisible } from '../../utils/constants';

const functionalitiesVisible = ref(defaultFunctionalitiesVisible);
const { booleanEventBus } = useEventBus();
booleanEventBus.subscribe("functionality_bar_visible", eventMessage => functionalitiesVisible.value = eventMessage.payload);
</script>

<style scoped>
.grid-template {
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
}
</style>
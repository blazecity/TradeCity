<template>
<div class="flex h-full">
    <tc-navigation />
    <div class="bg-background-main flex-auto grid grid-template">
      <tc-header></tc-header>
      <main class="grid grid-cols-6 grid-rows-6 gap-1">
        <tc-panel title="CHF Bond Pricing Panel" :cols="6" :rows="2">
          <tc-number-input placeholder="Input" @input="func" />
        </tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="2">Content 2</tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="2">Content 3</tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="2">Content 4</tc-panel>
        <tc-panel title="Panel 2" :cols="3" :rows="2">Content 5</tc-panel>
      </main>
    </div>
</div>
</template>

<script setup lang="ts">
import TcNavigation from '../nav/TcNavigation.vue';
import TcHeader from '../header/TcHeader.vue';
import TcPanel from '../controls/panel/TcPanel.vue';
import TcNumberInput from '../controls/input/TcNumberInput.vue';
import { ref } from 'vue';

function func(id: number): void {
  console.log(id);
}
</script>

<style scoped>
.grid-template {
  grid-template-rows: auto 1fr;
}
</style>
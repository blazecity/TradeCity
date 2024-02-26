<template>
  <header class="header-grid w-full py-0.5 px-2 z-10 h-7 bg-dark">
      <router-view name="FunctionalityNameArea" class="col-span-2"></router-view>
      <div class="flex gap-2 ml-auto items-center">
          <slot></slot>
      </div>
  </header>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {shallowRef, watch} from "vue";

const route = useRoute();
const headerContext = undefined;
</script>

<style scoped>
.header-grid {
    display: grid;
    grid-template-columns: minmax(200px, auto) auto 1fr;
    grid-gap: 10px;
    align-content: center;
}
</style>
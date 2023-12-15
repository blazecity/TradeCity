<template>
  <div class="my-1">
      <div class="px-1.5 mb-1">
          <span class="text-neutral-400 font-bold text-sm">{{ title.toUpperCase() }}</span>
      </div>
      <div>
          <slot></slot>
      </div>
  </div>
</template>

<script setup lang="ts">
type TcFunctionalityNavigationSectionProps = {
    title: string;
};
defineProps<TcFunctionalityNavigationSectionProps>();
</script>

<style scoped>

</style>
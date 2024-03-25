<template>
  <div class="column-group inline-grid">
      <slot></slot>
  </div>
</template>

<script setup lang="ts">
type TcTableHeaderGroup = {
    colspan: number;
}
defineProps<TcTableHeaderGroup>();
</script>

<style scoped>
.column-group {
    grid-column: span v-bind(colspan);
}
</style>
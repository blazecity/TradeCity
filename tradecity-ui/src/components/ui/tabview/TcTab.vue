<template>
  <div v-if="activeId === id" class="px-1 py-0.5 overflow-hidden">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type TcTabProps = {
  id: string,
  activeId: string,
}
defineProps<TcTabProps>();
</script>

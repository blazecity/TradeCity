<template>
  <div v-if="activeId === id" class="h-full overflow-hidden">
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

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type TcTabProps = {
  label: string,
  id: string
}
defineProps<TcTabProps>();
</script>

<style scoped>

</style>
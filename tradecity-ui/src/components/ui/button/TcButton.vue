<template>
  <button
      :class="['text-base m-1 py-px px-2 rounded-sm font-medium', dangerous ? 'bg-red-500 hover:bg-red-700' : 'bg-base hover:bg-dark-base']"
      :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
interface TcButtonProps {
  text: string;
  dangerous?: boolean;
  disabled?: boolean;
}
defineProps<TcButtonProps>();
</script>

<style scoped>

</style>
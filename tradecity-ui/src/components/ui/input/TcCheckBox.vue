<template>
  <input class="checkbox" type="checkbox" :checked="modelValue" @change="changeHandler">
</template>

<script setup lang="ts">
interface TcCheckBoxProps {
  modelValue: boolean;
}
defineProps<TcCheckBoxProps>();

interface TcCheckBoxEmits {
  (e: "update:modelValue", value: boolean): void;
}
const emits = defineEmits<TcCheckBoxEmits>();

// ========= EVENT HANDLERS =========
function changeHandler(event: Event): void {
  emits("update:modelValue", (event.target as HTMLInputElement).checked);
}
</script>

<style scoped lang="postcss">
.checkbox {
  @apply form-checkbox m-px z-0 bg-primary checked:bg-primary border-gray-600 ring-base focus:ring-1 focus:ring-offset-1 focus:ring-offset-primary text-gray-800 checked:border-gray-600;
}
</style>
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

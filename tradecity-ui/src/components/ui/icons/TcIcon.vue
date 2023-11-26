<template>
  <span :class="['material-icons', {'hover:bg-neutral-700 hover:cursor-pointer rounded-sm': clickable}]" @click="clickHandler">{{ icon }}</span>
</template>

<script setup lang="ts">
interface TcIconProps {
  icon: string;
  clickable?: boolean;
}
const props = defineProps<TcIconProps>();

interface TcIconEmits {
  (e: "click"): void;
}
const emits = defineEmits<TcIconEmits>();

// =========== EVENT HANDLERS ===========
function clickHandler() {
  if (props.clickable) {
    emits("click");
  }
}
</script>

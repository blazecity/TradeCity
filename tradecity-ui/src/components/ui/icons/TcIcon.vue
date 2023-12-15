<template>
  <span
      :class="['material-icons', {'hover:cursor-pointer rounded-sm': clickable, 'hover:bg-base': dark && clickable, 'hover:bg-primary': !dark && clickable}]"
      @click="clickHandler"
  >
      {{ icon }}
  </span>
</template>

<script setup lang="ts">
interface TcIconProps {
  icon: string;
  clickable?: boolean;
  dark?: boolean;
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

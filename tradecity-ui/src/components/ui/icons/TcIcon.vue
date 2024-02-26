<template>
  <span
      :class="[
          filled ? 'material-symbols-filled' : 'material-icons',
          {
              'hover:cursor-pointer': clickable,
              'rounded-xl': rounding === 'rounded' && clickable,
              'rounded-sm': rounding === 'semi-rounded' && clickable,
              'rounded-none': rounding === 'unrounded' && clickable,
              'hover:bg-base': dark && clickable,
              'hover:bg-neutral-700': !dark && clickable,
              'bg-base': dark && durableBackground,
              'bg-neutral-700': !dark && durableBackground,
              'bg-gray-500': soft && durableBackground
          }
      ]"
      @click="handleClick"
  >
      {{ icon }}
  </span>
</template>

<script setup lang="ts">
interface TcIconProps {
  icon: string;
  clickable?: boolean;
  rounding?: "rounded" | "semi-rounded" | "unrounded";
  dark?: boolean;
  soft?: boolean;
  durableBackground?: boolean;
  filled?: boolean;
}
const props = withDefaults(defineProps<TcIconProps>(), {
    rounding: "semi-rounded"
});

interface TcIconEmits {
  (e: "click"): void;
}
const emits = defineEmits<TcIconEmits>();

// =========== EVENT HANDLERS ===========
function handleClick() {
  if (props.clickable) {
    emits("click");
  }
}
</script>

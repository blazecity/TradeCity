<template>
  <button
      :class="[
          'font-bold outline-none min-w-fit rounded-sm',
          style(),
          {'px-2 py-0.5': plain}
      ]"
      :disabled="disabled"
  >
    <span class="flex items-center justify-center gap-x-0.5">
        <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
interface TcButtonProps {
  dangerous?: boolean;
  disabled?: boolean;
  plain?: boolean;
}
const props = defineProps<TcButtonProps>();

function style(): string {
  if (props.dangerous) {
      if (props.plain) return "text-red-500 hover:text-red-400";
      return "dangerous-background hover:bg-red-700 border border-red-500";
  }

  if (props.plain) return "text-neutral-400 hover:text-neutral-200";

  return "bg-zinc-400 text-black hover:bg-zinc-500";
}
</script>

<style scoped>
.dangerous-background {
  background-color: rgba(218, 96, 96, 0.7);
}

.dangerous-background:hover {
  background-color: rgb(194, 99, 99);
}
</style>
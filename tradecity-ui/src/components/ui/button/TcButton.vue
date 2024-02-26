<template>
  <button
      :class="[
          'text-normal m-1 font-bold outline-none min-w-fit rounded-sm',
          {
              'py-0.5 px-2': !plain,
              'text-red-500 hover:text-red-400': plain && dangerous,
              'text-neutral-400 hover:text-neutral-200': plain && !dangerous,
              'text-red-200 dangerous-button border border-red-500': !plain && dangerous,
              'text-neutral-400 basic-button standard-border': !plain && !dangerous,
          }
      ]"
      :disabled="disabled"
  >
    <span class="flex items-center justify-center gap-0.5">
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
defineProps<TcButtonProps>();
</script>

<style scoped>
.basic-button {
    background-color: rgba(42, 44, 47, 0.5);
}

.basic-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.dangerous-button {
    background-color: rgba(239, 92, 92, 0.5);
}

.dangerous-button:hover {
    background-color: rgba(246, 42, 42, 0.5);
}
</style>

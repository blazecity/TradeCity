<template>
  <button
      :class="[
          'text-normal m-1 font-bold outline-none min-w-fit rounded-sm',
          {
              'py-0.5 px-2': !plain,
              'text-red-500 hover:text-red-400': plain && dangerous,
              'text-neutral-400 hover:text-neutral-200': plain && !dangerous,
              'bg-red-500 hover:bg-red-700': !plain && dangerous,
              'bg-base hover:bg-dark-base': !plain && !dangerous,
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

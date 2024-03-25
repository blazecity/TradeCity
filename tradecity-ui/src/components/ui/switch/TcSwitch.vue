<template>
  <div :class="['flex rounded-xl hover:cursor-pointer', modelValue ? 'bg-blue-500' : 'bg-gray-500']" @click="handleClick">
    <div v-if="!modelValue" class="switch-knob"></div>
    <span :class="['prevent-select mt-[3px] font-bold', modelValue ? 'ml-1.5 mr-0.5' : 'ml-0.5 mr-1.5']">
      <slot></slot>
    </span>
    <div v-if="modelValue" class="switch-knob"></div>
  </div>
</template>

<script setup lang="ts">
type TcSwitchProps = {
  modelValue: boolean,
}
const props = defineProps<TcSwitchProps>();

type TcSwitchEmits = {
  "update:modelValue": [isActivated: boolean];
}
const emits = defineEmits<TcSwitchEmits>();

function handleClick(): void {
  emits("update:modelValue", !props.modelValue);
}
</script>

<style scoped lang="postcss">
.switch-knob {
  @apply w-5 h-5 rounded-full bg-white m-0.5;
}
</style>
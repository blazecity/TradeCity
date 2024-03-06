<template>
  <div :class="[
      {'inline-flex justify-between text-white items-center': withPlusMinus},
      {'bg-black': !header}
  ]">
    <tc-table-icon-button v-if="withPlusMinus" icon="remove" @click.stop="handleDecrease"/>
    <tc-number-input
        :model-value="modelValue" @update:model-value="handleUpdate" placeholder="value" table-input
        :class="[{ 'w-full': !withPlusMinus }]" :decimal-places="decimalPlaces" @click.stop
    />
    <tc-table-icon-button v-if="withPlusMinus" icon="add" @click.stop="handleIncrease"/>
  </div>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcNumberInput from "@/components/ui/input/TcNumberInput.vue";
import {useAttrs} from "vue";
import TcTableIconButton from "@/components/ui/table/TcTableIconButton.vue";

type TcTableNumberInputProps = {
  modelValue: number;
  decimalPlaces: number;
  withBorder?: boolean;
  withPlusMinus?: boolean;
  header?: boolean;
};
const props = defineProps<TcTableNumberInputProps>();

type TcTableNumberInputEmits = {
  "update:modelValue": [input: number];
};
const emits = defineEmits<TcTableNumberInputEmits>();

// ========== EVENT HANDLERS ==========
function handleUpdate(val: number): void {
  emits("update:modelValue", val);
}

function handleDecrease(): void {
  emits("update:modelValue", props.modelValue - 1);
}

function handleIncrease(): void {
  emits("update:modelValue", props.modelValue + 1);
}
</script>


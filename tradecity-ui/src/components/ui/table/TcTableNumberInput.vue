<template>
  <div :class="[
      'h-full border-b border-neutral-700 px-0.5',
      {'inline-flex justify-between text-white items-center': withPlusMinus},
      {'bg-input-dark': !header}
  ]">
    <tc-table-icon-button v-if="withPlusMinus" icon="remove" @click.stop="handleDecrease"/>
    <tc-number-input
        v-model="model" placeholder="value" :class="[{ 'w-full h-full': !withPlusMinus }, {'text-center': centered}]"
        :decimal-places="decimalPlaces" :unit="unit" @click.stop dark
    />
    <tc-table-icon-button v-if="withPlusMinus" icon="add" @click.stop="handleIncrease"/>
  </div>
</template>

<script setup lang="ts">
import TcNumberInput from "@/components/ui/input/TcNumberInput.vue";
import TcTableIconButton from "@/components/ui/table/TcTableIconButton.vue";
import {defineModel} from "vue";

type TcTableNumberInputProps = {
  decimalPlaces: number;
  withBorder?: boolean;
  withPlusMinus?: boolean;
  header?: boolean;
  unit?: string;
  centered?: boolean;
};
const props = defineProps<TcTableNumberInputProps>();

const model = defineModel();

type TcTableNumberInputEmits = {
  "update:modelValue": [input: number];
};
const emits = defineEmits<TcTableNumberInputEmits>();

// ========== EVENT HANDLERS ==========

function handleDecrease(): void {
  model.value--;
}

function handleIncrease(): void {
  model.value++;
}
</script>


<template>
  <div class="inline-flex items-center bg-dark">
      <button @click.stop="decreaseHandler" class="inline-flex items-center hover:bg-base bg-table-secondary h-5 outline-none">
          <tc-icon class="" icon="remove" rounding="unrounded" />
      </button>
      <tc-number-input :model-value="modelValue" @update:model-value="updateHandler" placeholder="value" table-input :class="attrs.class" :decimal-places="decimalPlaces" @click.stop  />
      <button @click.stop="increaseHandler" class="inline-flex items-center hover:bg-base bg-table-secondary h-5 outline-none">
          <tc-icon class="" icon="add" rounding="unrounded" />
      </button>
  </div>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcNumberInput from "@/components/ui/input/TcNumberInput.vue";
import {useAttrs} from "vue";

type TcTableNumberInputProps = {
    modelValue: number;
    decimalPlaces: number;
};
const props = defineProps<TcTableNumberInputProps>();

type TcTableNumberInputEmits = {
    "update:modelValue": [input: number];
};
const emits = defineEmits<TcTableNumberInputEmits>();

const attrs = useAttrs();
defineOptions({
    inheritAttrs: false
});

// ========== EVENT HANDLERS ==========
function updateHandler(val: number): void {
    emits("update:modelValue", val);
}

function decreaseHandler(): void {
    emits("update:modelValue", props.modelValue - 1);
}

function increaseHandler(): void {
    emits("update:modelValue", props.modelValue + 1);
}
</script>


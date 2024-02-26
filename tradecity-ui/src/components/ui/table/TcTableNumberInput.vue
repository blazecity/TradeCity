<template>
  <div :class="[
      'inline-flex justify-between text-white items-center w-full',
      {'border-x border-b border-zinc-800': withBorder},
      {'border-t': first},
      {'bg-black': !header}
  ]">
      <button @click.stop="handleDecrease" class="inline-flex items-center hover:bg-base rounded-full outline-none">
          <tc-icon class="text-sm" icon="remove" rounding="unrounded" />
      </button>
      <tc-number-input
         :model-value="modelValue" @update:model-value="handleUpdate" placeholder="value" table-input
         :class="[attrs.class, 'w-20']" :decimal-places="decimalPlaces" @click.stop
      />
      <button @click.stop="handleIncrease" class="inline-flex items-center hover:bg-base rounded-full outline-none">
          <tc-icon class="text-sm" icon="add" rounding="unrounded" />
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
    withBorder?: boolean;
    first?: boolean;
    header?: boolean;
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


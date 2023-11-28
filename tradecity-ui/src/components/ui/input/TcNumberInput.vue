<template>
  <tc-input
      :zero-value="zeroValue" :format="format" v-model="value" :placeholder="placeholder"
      :sanitize="sanitize" :validation="validation"
  />
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import type {SanitizingResult, ValidationFn} from "@/components/ui/input";
import {NextOperation} from "@/components/ui/input";
import TcInput from "@/components/ui/input/TcInput.vue";

interface TcNumberInputProps {
  modelValue: number;
  placeholder: string;
  decimalPlaces?: number;
  validation?: ValidationFn<number>;
}
const props = withDefaults(defineProps<TcNumberInputProps>(), {
  validation: () => ({ isValid: true, errorMessage: "" }),
  decimalPlaces: 1
});

interface TcNumberInputEmits {
  (e: "update:modelValue", value: number): void;
}
const emits = defineEmits<TcNumberInputEmits>();

const zeroValue = 0;
const value = ref(props.modelValue);
watch(value, val => emits("update:modelValue", val), { immediate: true });

// ============== HELPER FUNCTIONS ==============
function sanitize(input: string): SanitizingResult<number, string> {
  if (input === "-") {
    return {
      nextOperation: NextOperation.NO_OP,
      value: -0,
      rawValue: "0"
    };
  }

  // TODO: Could be improved if all characters except m, k and - cannot even be entered.
  let intermediate = input
      .replace("k", "000")
      .replace("m", "000000")
      .replace(/[^0-9.-]/g, "");

  const parts = intermediate.split(".");
  if (parts.length > 1 && props.decimalPlaces > 0) {
    if (parts[1] === "") {
      return {
        nextOperation: NextOperation.SET_RAW,
        value: +parts[0],
        rawValue: parts[0] + "."
      }
    }

    const firstPart = parts[0];
    const fractionalPart = parts[1].substring(0, props.decimalPlaces);
    intermediate = `${firstPart}.${fractionalPart}`;
  } else {
    intermediate = parts[0];
  }

  return {
    nextOperation: NextOperation.FORMAT,
    value: +intermediate,
    rawValue: intermediate
  };
}

function format(num: number): string {
  return Intl.NumberFormat("de-CH", { maximumFractionDigits: props.decimalPlaces }).format(num);
}
</script>
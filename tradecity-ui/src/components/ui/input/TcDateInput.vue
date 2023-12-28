<template>
  <tc-input
          class="-my-px" :zero-value="new Date()" :format="format" v-model="internalValue" :placeholder="placeholder"
          :sanitize="sanitize" :validation="validation" type="date"
  />
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import type {SanitizingResult, ValidationFn} from "@/components/ui/input";
import TcInput from "@/components/ui/input/TcInput.vue";
import {NextOperation} from "@/components/ui/input";

interface TcStringInputProps {
  modelValue: Date;
  placeholder: string;
  validation?: ValidationFn<Date>;
}
const props = withDefaults(defineProps<TcStringInputProps>(), {
  validation: () => ({ isValid: true, errorMessage: "" })
});

interface TcStringInputEmits {
  (e: "update:modelValue", value: Date): void;
}
const emits = defineEmits<TcStringInputEmits>();

const internalValue = ref(props.modelValue);
watch(internalValue, val => emits("update:modelValue", val), { immediate: true });
watch(() => props.modelValue, val => { internalValue.value = val }, { immediate: true });

// ============== HELPER FUNCTIONS ==============
function sanitize(val: string): SanitizingResult<Date, string> {
  return {
    nextOperation: NextOperation.FORMAT,
    value: new Date(Date.parse(val)),
    rawValue: val,
  };
}

const format = (val: Date) => val.toISOString().split("T")[0];
</script>

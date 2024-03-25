<template>
  <tc-input
          zero-value="" :format="format" v-model="internalValue" :placeholder="placeholder"
          :sanitize="sanitize" :validation="validation" :unit="unit" :dark="dark"
  />
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import type {ValidationFn} from "@/components/ui/input";
import TcInput from "@/components/ui/input/TcInput.vue";
import {NextOperation} from "@/components/ui/input";

interface TcStringInputProps {
  modelValue: string;
  placeholder: string;
  validation?: ValidationFn<string>;
  unit?: string;
  dark?: boolean;
}
const props = defineProps<TcStringInputProps>();

interface TcStringInputEmits {
  (e: "update:modelValue", value: string): void;
}
const emits = defineEmits<TcStringInputEmits>();

const internalValue = ref(props.modelValue);
watch(internalValue, val => emits("update:modelValue", val), { immediate: true });
watch(() => props.modelValue, val => { internalValue.value = val }, { immediate: true });

// ============== HELPER FUNCTIONS ==============
const sanitize = (val: string) => ({
  nextOperation: NextOperation.FORMAT,
  value: val,
  rawValue: val
});
const format = (val: string) => val;
</script>

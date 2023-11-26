<template>
  <div :class="['base-input', validationResult.isValid ? 'valid-input' : 'error-input']">
    <input
        :type="type" class="bg-transparent outline-none px-1.5 text-normal" :value="displayedValue"
        @input="inputHandler" :placeholder="placeholder" v-bind="attrs"
    >
    <tc-icon :class="['text-lg', validationResult.isValid ? 'text-white' : 'text-red-500']" icon="close" clickable @click="resetClickHandler" />
  </div>
</template>

<script setup lang="ts" generic="T extends TargetType, V extends InputType">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import type {
  FormatFn,
  InputType,
  SanitizeFn,
  TargetType,
  ValidationFn
} from "@/components/ui/input/index";
import type {Ref} from "vue";
import {computed, ref, useAttrs} from "vue";
import {NextOperation} from "@/components/ui/input/index";

type TcInputProps = {
  modelValue: T;
  placeholder: string;
  validation?: ValidationFn<T>;
  format: FormatFn<T, V>;
  sanitize: SanitizeFn<T, V>;
  zeroValue: T;
  type?: string;
}
const props = withDefaults(defineProps<TcInputProps>(), {
  validation: () => ({ isValid: true, errorMessage: "" }),
  type: "text"
});

type TcInputEmits = {
  (e: 'update:modelValue', value: T): void;
}
const emits = defineEmits<TcInputEmits>();

const attrs = useAttrs();

const rawInput = ref("");
const sanitizedValue = ref(props.zeroValue) as Ref<T>;
const displayedValue = ref(props.format(props.modelValue)) as Ref<V>;
const validationResult = computed(() => props.validation(sanitizedValue.value));

// ============== EVENT HANDLERS ==============
function inputHandler(event: Event): void {
  const newValue = (event.target as HTMLInputElement).value;
  rawInput.value = newValue;
  const sanitizingResult = props.sanitize(newValue);

  switch (sanitizingResult.nextOperation) {
    case NextOperation.FORMAT: {
      emits("update:modelValue", sanitizingResult.value);
      sanitizedValue.value = sanitizingResult.value;
      const formattedValue = props.format(sanitizingResult.value);
      // temporary assignment of an intermediate value to trigger reactivity when value stays the same (127 => 127, 127. => 127)
      displayedValue.value = `${formattedValue}1` as V;
      displayedValue.value = formattedValue;
      break;
    }

    case NextOperation.SET_RAW: {
      // temporary assignment of an intermediate value to trigger reactivity when value stays the same (127 => 127, 127. => 127)
      displayedValue.value = sanitizingResult.rawValue + "1" as V;
      displayedValue.value = sanitizingResult.rawValue;
      break;
    }

    case NextOperation.NO_OP: {
      break;
    }
  }
}

function resetClickHandler(): void {
  sanitizedValue.value = props.zeroValue;
  displayedValue.value = props.format(props.zeroValue);
  emits("update:modelValue", props.zeroValue);
}
</script>

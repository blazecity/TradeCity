<template>
<div :class="['flex items-center justify-between rounded-sm border-neutral-600 border text-xs', styles ? styles : 'w-56']">
    <label v-if="showLabel" :for="id"></label>
    <input :id="id" @input="input" :value="displayedValue" :placeholder="placeholder" type="text" class="general-input" :title="placeholder" autocomplete="new-password">
    <clickable-icon @click="clearValue">
        <close-icon :height="16" :width="16" styles="fill-neutral-400 mr-1" />
    </clickable-icon>
</div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import CloseIcon from '../../icons/CloseIcon.vue';
import ClickableIcon from '../../icons/ClickableIcon.vue';
import { InputType } from '../../../utils/types';

interface TcInputProps {
    placeholder: string,
    styles?: string,
    defaultValue?: number | string,
    type?: InputType,
    showLabel?: boolean
}

const props = withDefaults(defineProps<TcInputProps>(), {
    type: "number"
});

interface TcInputEmits {
    (event: "numberInput", value: number): void;
    (event: "textInput", value: string): void;
}

const emit = defineEmits<TcInputEmits>();
const id = crypto.randomUUID();
const inputValue = ref<string | number | undefined>(props.defaultValue);
const displayedValue = computed(() => {
    if (props.type === "string" && inputValue.value !== undefined) {
        emit("textInput", inputValue.value.toString());
        return inputValue.value;
    }

    if (!inputValue.value) {
        emit("numberInput", NaN);
        return "";
    }
    const num = +inputValue.value.toString().replace(/[k]/g, "000").replace(/[m]/g, "000000").replace(/[^0-9.-]/g, "");
    emit("numberInput", num);
    return Intl.NumberFormat("de-CH").format(num);
});

const input = (event: Event) => inputValue.value = (event.target as HTMLInputElement).value; 
const clearValue = () => inputValue.value = undefined;
</script>
<template>
<div class="flex items-center justify-between rounded bg-primary w-56">
    <input @focusout="focusOut" :value="displayedValue" :placeholder="placeholder" type="text" class="general-input" :title="placeholder" autocomplete="new-password">
    <clickable-icon @click="clearValue">
        <close-icon :height="12" :width="12" styles="fill-white mr-1" />
    </clickable-icon>
</div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import CloseIcon from '../../icons/CloseIcon.vue';
import ClickableIcon from '../../icons/ClickableIcon.vue';

interface TcInputProps {
    placeholder: string,
    styles?: string,
    defaultValue?: number | string,
    type?: "string" | "number"
}

const props = withDefaults(defineProps<TcInputProps>(), {
    type: "number"
});

interface TcInputEmits {
    (event: "numberInput", value: number): void;
    (event: "textInput", value: string): void;
}

const emit = defineEmits<TcInputEmits>();
const inputValue = ref<string | number | undefined>(props.defaultValue);
const displayedValue = computed(() => {
    if (props.type === "string" && inputValue.value) {
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

const focusOut = (event: FocusEvent) => inputValue.value = (event.target as HTMLInputElement).value; 
const clearValue = () => inputValue.value = undefined;
</script>

<style scoped>

</style>
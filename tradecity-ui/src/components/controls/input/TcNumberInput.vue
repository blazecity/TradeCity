<template>
<div class="flex items-center justify-between rounded bg-primary w-56">
    <input @focusout="focusOut" :value="displayedValue" :placeholder="placeholder" type="text" class="bg-primary w-full outline-none m-1 text-xs" :title="placeholder" autocomplete="new-password">
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

interface TcNumberInputProps {
    placeholder: string,
    styles?: string,
    defaultValue?: number
}

const props = defineProps<TcNumberInputProps>();

interface TcInputEmits {
    (event: "input", id: number): void
}

const emit = defineEmits<TcInputEmits>();
const inputValue = ref<string | number | undefined>(props.defaultValue);
const displayedValue = computed(() => {
    if (!inputValue.value) {
        emit("input", NaN);
        return "";
    }
    const num = +inputValue.value.toString().replace(/[k]/g, "000").replace(/[m]/g, "000000").replace(/[^0-9.-]/g, "");
    emit("input", num);
    return Intl.NumberFormat("de-CH").format(num);
});

const focusOut = (event: FocusEvent) => inputValue.value = (event.target as HTMLInputElement).value; 
const clearValue = () => inputValue.value = undefined;
</script>

<style scoped>

</style>
<template>
  <span :class="['p-1', {'text-blue-400': colored && value >= 0}, {'text-red-500': colored && value < 0}]">{{ formattedNumber }}</span>
</template>

<script setup lang="ts">
import {computed} from "vue";

type TcTableImmutableNumberProps = {
    value: number;
    decimalPlaces: number;
    colored?: boolean;
};
const props = defineProps<TcTableImmutableNumberProps>();

const formattedNumber = computed(() =>
    Intl.NumberFormat("de-CH", {
        minimumFractionDigits: props.decimalPlaces,
        maximumFractionDigits: props.decimalPlaces }
    ).format(props.value)
);
</script>

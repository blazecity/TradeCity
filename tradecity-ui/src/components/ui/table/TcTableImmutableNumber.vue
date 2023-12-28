<template>
  <span>{{ formattedNumber }}</span>
</template>

<script setup lang="ts">
import {computed} from "vue";

type TcTableImmutableNumberProps = {
    value: number;
    decimalPlaces: number;
};
const props = defineProps<TcTableImmutableNumberProps>();

const formattedNumber = computed(() =>
    Intl.NumberFormat("de-CH", {
        minimumFractionDigits: props.decimalPlaces,
        maximumFractionDigits: props.decimalPlaces }
    ).format(props.value)
);
</script>

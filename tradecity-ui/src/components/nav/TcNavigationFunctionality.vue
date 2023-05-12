<template>
<div :class="['flex mx-2 my-1.5 p-0.5 items-center functionality-item rounded-sm text-sm hover:cursor-pointer', selectedFunctionality && selectedFunctionality[0] === props.functionality[0] ? 'bg-tc-blue' : 'hover:bg-zinc-100 hover:bg-opacity-10']">
    <label-icon @click="bookmark" :styles="getIconStyle()" :height="24" :width="24" :filled="isBookmarked" />
    <div @click="select" class="w-full">{{ functionality[1].name }}</div>
</div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import LabelIcon from '../icons/LabelIcon.vue';
import { useModuleIndex } from '../../utils/store';
import { ModuleFunctionality } from './modules';
import { storeToRefs } from 'pinia';

interface TcNavgationFunctionalityProps {
    functionality: [string, ModuleFunctionality]
}

const props = defineProps<TcNavgationFunctionalityProps>();
const isBookmarked = toRef(props.functionality[1], "isBookmarked");

const { selectedFunctionality } = storeToRefs(useModuleIndex());

function bookmark(): void {
    isBookmarked.value = !isBookmarked.value;
    console.log(props.functionality);
}

function select(): void {
    selectedFunctionality.value = props.functionality;
}

function getIconStyle(): string {
    if (isBookmarked.value && selectedFunctionality.value?.[0] === props.functionality[0]) return "fill-dark-blue mr-1";
    if (isBookmarked.value) return "fill-tc-blue mr-1";
    return "fill-white mr-1";
}
</script>
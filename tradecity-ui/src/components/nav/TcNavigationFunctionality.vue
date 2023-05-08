<template>
<div :class="['flex mx-2 my-1.5 p-0.5 items-center functionality-item rounded-sm text-sm hover:cursor-pointer', selected ? 'bg-tc-blue' : 'hover:bg-zinc-100 hover:bg-opacity-10']">
    <label-icon @click="bookmark" :styles="getIconStyle()" :height="24" :width="24" :filled="filled" />
    <div @click="select" class="w-full">{{ functionality.name }}</div>
</div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import LabelIcon from '../icons/LabelIcon.vue';
import { useEventBus } from '../../utils/store';
import { ModuleFunctionality } from './modules';
import { EventMessage, Topics } from '../../utils/eventbus';

interface TcNavgationFunctionalityProps {
    functionality: ModuleFunctionality
}

const props = defineProps<TcNavgationFunctionalityProps>();

const filled = ref(false);
const selected = ref(false);
const { stringEventBus } = useEventBus();
const subscription = stringEventBus.subscribe(Topics.FUNCTIONALITY_SELECTED, eventMessage => selected.value = eventMessage.payload === props.functionality.id);

onUnmounted(() => subscription.unsubscribe());

function bookmark(): void {
    filled.value = !filled.value;
}

function select(): void {
    console.log(props.functionality);
    selected.value = true;
    stringEventBus.emit(Topics.FUNCTIONALITY_SELECTED, new EventMessage("", props.functionality.id));
    stringEventBus.emit(Topics.FUNCTIONALITY_SELECTED_NAME, new EventMessage("", props.functionality.name));
}

function getIconStyle(): string {
    if (filled.value && selected.value) return "fill-dark-blue mr-1";
    if (filled.value) return "fill-tc-blue mr-1";
    return "fill-white mr-1";
}
</script>

<style scoped>

</style>
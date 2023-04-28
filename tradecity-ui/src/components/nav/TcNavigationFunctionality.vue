<template>
<div :class="['flex mx-2 my-1.5 p-0.5 items-center functionality-item rounded text-sm', selected ? 'bg-neutral-600 bg-opacity-50' : '']">
    <label-icon @click="bookmark" :styles="getIconStyle()" :height="24" :width="24" :filled="filled" />
    <div @click="select" class="w-full">{{ functionality.name }}</div>
</div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import LabelIcon from '../icons/LabelIcon.vue';
import { useEventBus } from '../../utils/store';
import { ModuleFunctionality } from '../../utils/modules';
import { EventMessage } from '../../utils/eventbus';

interface TcNavgationFunctionalityProps {
    functionality: ModuleFunctionality
}

const props = defineProps<TcNavgationFunctionalityProps>();

const filled = ref(false);
const selected = ref(false);
const { stringEventBus } = useEventBus();
const subscription = stringEventBus.subscribe("functionality_selected", eventMessage => selected.value = eventMessage.payload === props.functionality.id);

onUnmounted(() => subscription.unsubscribe());

function bookmark(): void {
    filled.value = !filled.value;
}

function select(): void {
    console.log(props.functionality);
    selected.value = true;
    stringEventBus.emit("functionality_selected", new EventMessage("", props.functionality.id));
    stringEventBus.emit("functionality_selected_name", new EventMessage("", props.functionality.name));
}

function getIconStyle(): string {
    if (filled.value && selected.value) return "fill-tc-blue mr-1";
    if (filled.value) return "fill-tc-blue mr-1";
    return "fill-white mr-1";
}
</script>

<style scoped>

</style>
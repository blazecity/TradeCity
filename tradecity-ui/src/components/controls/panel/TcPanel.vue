<template>
<div :class="['grid-cols-1 grid-rows-2 panel-inner-grid-template h-full bg-primary p-1 rounded panel-grid-template text-sm', visible ? 'grid' : 'hidden']">
    <div class="flex items-center mb-0.5">
        <span class="text-xs">{{ title }}</span>
        <clickable-icon styles="ml-auto">
            <north-east-icon v-if="!expanded" @click="resize" :height="14" :width="14" styles="fill-white" />
            <south-west-icon v-else @click="resize" :height="14" :width="14" styles="fill-white" />
        </clickable-icon>
    </div>
    <div class="overflow-auto scrollbar h-full p-0.5">
        <slot />
    </div>
</div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import NorthEastIcon from '../../icons/NorthEastIcon.vue';
import SouthWestIcon from '../../icons/SouthWestIcon.vue';
import { computed } from '@vue/reactivity';
import { useEventBus } from '../../../utils/store';
import { EventMessage, Topics } from '../../../utils/eventbus';
import ClickableIcon from '../../icons/ClickableIcon.vue';

interface TcPanelProps {
    title: string,
    cols: number,
    rows: number
}

const props = defineProps<TcPanelProps>();

const expanded = ref(false);
const visible = ref(true);
const panelId = crypto.randomUUID();
const { booleanEventBus } = useEventBus();

const colSpan = computed(() => expanded.value ? ['1', '-1'] : [`span ${props.cols}`, `span ${props.cols}`]);
const rowSpan = computed(() => expanded.value ? ['1', '-1'] : [`span ${props.rows}`, `span ${props.rows}`]);
const subscription = booleanEventBus.subscribe(Topics.PANEL_EXPANDED, eventMessage => visible.value = eventMessage.messageId === panelId || !eventMessage.payload);

function resize(): void {
    expanded.value = !expanded.value;
    booleanEventBus.emit(Topics.PANEL_EXPANDED, new EventMessage(panelId, expanded.value));
}

onUnmounted(() => subscription.unsubscribe());
</script>

<style scoped>
.panel-grid-template {
    grid-column: v-bind('colSpan[0]') / v-bind('colSpan[1]');
    grid-row: v-bind('rowSpan[0]') / v-bind('rowSpan[1]');
}

.panel-inner-grid-template {
    grid-template-rows: auto 1fr;
}
</style>
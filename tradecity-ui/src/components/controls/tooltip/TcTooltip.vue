<template>
    <div class="relative inline-block group">
        <slot></slot>
        <div :class="['text-xs text-neutral-400 font-bold scale-0 absolute rounded-sm border border-neutral-600 bg-black p-1 z-10 top-full mt-1', visible ? 'group-hover:scale-100' : '']">{{ text }}</div>
    </div>
</template>

<script setup lang="ts">
interface TcToolTipProps {
    text: string,
    visible?: boolean
}

defineProps<TcToolTipProps>();
</script>
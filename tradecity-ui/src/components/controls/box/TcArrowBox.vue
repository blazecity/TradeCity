<template>
    <span :class="['z-50 arrow-box absolute w-auto py-2 px-3 m-2 min-w-max rounded-md text-white text-sm bg-dark duration-100 scale-0 group-hover:scale-100', leftDirection, bold ? 'font-bold' : 'font-normal']">{{ text }}</span>
</template>

<script setup lang="ts">
interface TcArrowBoxProps {
    text: string,
    arrowDirection?: "right" | "left" | "up" | "down",
    bold?: boolean
}

const leftDirection = "left-14 origin-left";

withDefaults(defineProps<TcArrowBoxProps>(), {
    arrowDirection: "left",
    bold: true
});
</script>

<style scoped>
.arrow-box:before {
    content: " ";
    position: absolute;
    top: 12px;
    left: -6px;
    border-top: 5px solid transparent;
    border-right: 6px solid var(--dark);
    border-left: none;
    border-bottom: 5px solid transparent;
}
</style>
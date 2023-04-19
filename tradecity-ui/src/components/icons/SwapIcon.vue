<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="M273 896 80 703l193-193 42 42-121 121h316v60H194l121 121-42 42Zm414-254-42-42 121-121H450v-60h316L645 298l42-42 193 193-193 193Z"/>
    </svg>
</template>
    
<script setup lang="ts">
interface SwapIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<SwapIconProps>(), {
    styles: "fill-blue",
    width: 48,
    height: 48
});
</script>
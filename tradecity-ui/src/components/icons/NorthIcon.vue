<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="M450 976V290L242 498l-42-42 280-280 280 280-42 42-208-208v686h-60Z"/>
    </svg>
</template>
    
<script setup lang="ts">
interface CloseIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<CloseIconProps>(), {
    styles: "fill-tc-blue",
    width: 48,
    height: 48
});
</script>
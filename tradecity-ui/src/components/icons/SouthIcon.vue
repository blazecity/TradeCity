<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="M480 976 200 696l42-42 208 208V176h60v686l208-208 42 42-280 280Z"/>
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
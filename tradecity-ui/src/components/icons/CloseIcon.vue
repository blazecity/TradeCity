<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
    </svg>
</template>
    
<script setup lang="ts">
interface CloseIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<CloseIconProps>(), {
    styles: "fill-blue",
    width: 48,
    height: 48
});
</script>
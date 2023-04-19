<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="M194 862V451h73v287l491-491 51 51-491 491h287v73H194Z"/>
    </svg>
</template>
    
<script setup lang="ts">
interface SouthWestIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<SouthWestIconProps>(), {
    styles: "fill-blue",
    width: 48,
    height: 48
});
</script>
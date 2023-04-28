<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="m162 945-51-51 207-208H215v-73h228v228h-73V738L162 945Zm357-408V310h73v103l206-206 51 51-206 206h103v73H519Z"/>
    </svg>
</template>
    
<script setup lang="ts">
interface HideIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<HideIconProps>(), {
    styles: "fill-tc-blue",
    width: 48,
    height: 48
});
</script>
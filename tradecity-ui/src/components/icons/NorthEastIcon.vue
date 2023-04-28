<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="m202 905-51-51 492-492H356v-73h411v411h-73V413L202 905Z"/>
    </svg>
</template>
    
<script setup lang="ts">
interface NorthEastIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<NorthEastIconProps>(), {
    styles: "fill-tc-blue",
    width: 48,
    height: 48
});
</script>
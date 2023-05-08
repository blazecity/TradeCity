<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="m600 856-42-42 208-208H80v-60h686L558 338l42-42 280 280-280 280Z"/>
    </svg>
</template>

<script setup lang="ts">
interface EastIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<EastIconProps>(), {
    styles: "fill-tc-blue",
    width: 48,
    height: 48
});
</script>
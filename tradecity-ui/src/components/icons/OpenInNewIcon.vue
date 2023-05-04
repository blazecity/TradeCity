<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h279v60H180v600h600V597h60v279q0 24-18 42t-42 18H180Zm202-219-42-43 398-398H519v-60h321v321h-60V319L382 717Z"/>
    </svg>
</template>
    
<script setup lang="ts">
interface OpenInNewIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<OpenInNewIconProps>(), {
    styles: "fill-tc-blue",
    width: 48,
    height: 48
});
</script>
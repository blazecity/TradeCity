<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="M320 814 80 574l242-242 43 43-199 199 197 197-43 43Zm318 2-43-43 199-199-197-197 43-43 240 240-242 242Z"/>
    </svg>
</template>

<script setup lang="ts">
interface CodeIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<CodeIconProps>(), {
    styles: "fill-tc-blue",
    width: 48,
    height: 48
});
</script>
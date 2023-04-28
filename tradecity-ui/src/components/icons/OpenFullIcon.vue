<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path d="M120 936V636h60v198l558-558H540v-60h300v300h-60V318L222 876h198v60H120Z"/>
    </svg>
</template>
    
<script setup lang="ts">
interface OpenFullIconProps {
    styles?: string
    width?: number,
    height?: number
} 

withDefaults(defineProps<OpenFullIconProps>(), {
    styles: "fill-tc-blue",
    width: 48,
    height: 48
});
</script>
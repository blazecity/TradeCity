<template>
<svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
    <path v-if="filled" d="M840 576 671 815q-13 18-31 29.5T600 856H180q-25 0-42.5-17.5T120 796V356q0-25 17.5-42.5T180 296h420q22 0 40 11.5t31 29.5l169 239Z"/>
    <path v-else d="M840 576 671 815q-13 18-31 29.5T600 856H180q-24.75 0-42.375-17.625T120 796V356q0-24.75 17.625-42.375T180 296h420q22 0 40 11.5t31 29.5l169 239Zm-75 0L611 356H180v440h431l154-220Zm-585 0v220-440 220Z"/>
</svg>
</template>

<script setup lang="ts">
interface LabelIconProps {
    styles?: string
    width?: number,
    height?: number,
    filled?: boolean
} 

withDefaults(defineProps<LabelIconProps>(), {
    styles: "fill-tc-blue",
    width: 48,
    height: 48,
    filled: false
});
</script>

<style scoped>

</style>
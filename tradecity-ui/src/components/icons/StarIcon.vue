<template>
    <svg :class="[styles, 'h-full']" xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 96 960 960" :width="width">
        <path v-if="filled" d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
        <path v-else d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/>
        
    </svg>
</template>
    
<script setup lang="ts">
interface StarIconProps {
    styles?: string
    width?: number,
    height?: number,
    filled?: boolean
} 

withDefaults(defineProps<StarIconProps>(), {
    styles: "fill-tc-blue",
    width: 48,
    height: 48,
    filled: false
});
</script>
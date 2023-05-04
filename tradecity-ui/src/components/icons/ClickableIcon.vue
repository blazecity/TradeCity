<template>
<div :class="['hover:cursor-pointer inline-block hover:bg-primary rounded', styles]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

interface ClickableIconProps {
    styles?: string,
}

defineProps<ClickableIconProps>();
</script>
<template>
<div :class="['font-bold rounded-sm text-sm py-0.5 px-1.5 m-1 inline-block', childClass, fontColorWhite ? 'text-white' : 'text-black']">{{ text }}</div>
</template>

<script setup lang="ts">
interface TcBadgeProps {
    text: string,
    childClass: string,
    fontColorWhite?: boolean
}
withDefaults(defineProps<TcBadgeProps>(), {
    fontColorWhite: true
});

</script>
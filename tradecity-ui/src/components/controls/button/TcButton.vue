<template>
<button type="button" :class="['text-sm rounded-sm px-2.5 py-0.5 m-0.5 border border-neutral-600', styles, !dangerous ? 'bg-primary hover:bg-secondary' : 'bg-red-500 hover:bg-red-400']">{{ text }}</button>
</template>

<script setup lang="ts">
interface TcButtonProps {
    text: string,
    dangerous?: boolean,
    styles?: string
}

withDefaults(defineProps<TcButtonProps>(), {
    dangerous: false
});
</script>

<style scoped>

</style>
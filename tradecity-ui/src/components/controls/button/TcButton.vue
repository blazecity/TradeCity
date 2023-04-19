<template>
<button type="button" class="bg-blue text-sm rounded-sm px-1.5 py-0.5 hover:bg-dark-blue m-0.5">{{ text }}</button>
</template>

<script setup lang="ts">
interface TcButtonProps {
    text: string
}

defineProps<TcButtonProps>();
</script>

<style scoped>

</style>
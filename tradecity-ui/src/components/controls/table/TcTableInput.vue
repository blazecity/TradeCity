<template>
<input type="text" class="outline-none bg-black bg-opacity-50 border-table-secondary border-b border-l w-full">
</template>

<script setup lang="ts">
interface TcTableInputProps {
    styles?: string
}

defineProps<TcTableInputProps>();
</script>

<style scoped>

</style>
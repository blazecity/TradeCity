<template>
<div class="flex items-center m-1 p-0.5 rounded-sm hover:bg-zinc-100 hover:bg-opacity-10 hover:cursor-pointer text-sm">
    <span class="mx-1">{{ name }}</span>
    <span class="text-xs ml-auto text-slate-400">{{ description }}</span>
</div>
</template>

<script setup lang="ts">
interface TcSearchResultProps {
    name: string,
    description: string
}

defineProps<TcSearchResultProps>();
</script>

<style scoped>

</style>
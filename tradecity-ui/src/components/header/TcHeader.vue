<template>
<header class="flex py-2.5 px-4 border-b-[1px] border-b-zinc-800 shadow-sm">
    <span class="font-bold mr-auto">{{ title }}</span>
    <tc-search-bar />
</header>
</template>

<script setup lang="ts">
import TcSearchBar from '../controls/search/TcSearchBar.vue';

interface TcHeaderProps {
    title: string
}
defineProps<TcHeaderProps>();

</script>

<style scoped>

</style>
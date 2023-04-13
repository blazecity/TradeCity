<template>
<div class="flex bg-primary p-0.5 rounded-[3px] text-sm text-neutral-100">
    <input v-model="text" placeholder="Search" type="text" :class="['bg-primary outline-none mr-3 ml-1 pt-0.5 transition-width duration-400', text.length === 0 ? 'w-32' : 'w-72']">
    <img v-if="text.length === 0" class="ml-auto mr-1" src="../../../assets/img/icons/search.svg" alt="Search Icon">
    <img @click="resetText" v-else class="ml-auto mr-1 hover:cursor-pointer" src="../../../assets/img/icons/close.svg" alt="Close Icon">
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref("");
const resetText = () => text.value = "";
</script>

<style scoped>

</style>
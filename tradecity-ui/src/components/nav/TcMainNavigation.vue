<template>
<nav class="bg-primary h-full p-0.5">
    <tc-navigation-icon @click="setSelectedIcon('home')" icon-url="../../assets/img/icons/tc_logo.svg" text="Home" :is-selected="getSelectedIcon('home')" :has-border="false" />
    <div class="h-0.5 my-2 mx-2.5 bg-tertiary"></div>
    <tc-navigation-icon @click="setSelectedIcon('bonds')" icon-url="../../assets/img/icons/hub.svg" text="Bonds" :is-selected="getSelectedIcon('bonds')" />
    <tc-navigation-icon @click="setSelectedIcon('marketdata')" icon-url="../../assets/img/icons/database.svg" text="Market Data" :is-selected="getSelectedIcon('marketdata')" />
    <tc-navigation-icon @click="setSelectedIcon('dev')" icon-url="../../assets/img/icons/code.svg" text="Developer" :is-selected="getSelectedIcon('dev')" />
</nav>
<div class="bg-secondary w-48">Hello</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TcNavigationIcon from './TcNavigationIcon.vue';

const selectedIcon = ref("home");

const setSelectedIcon = (id: string) => selectedIcon.value = id;
const getSelectedIcon = (id: string) => selectedIcon.value === id;
</script>

<style scoped>

</style>
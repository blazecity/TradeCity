<template>
    <span class="ml-1">frontend version: {{ version }}</span>
</template>

<script setup lang="ts">
import {version} from '../../../../package.json';
</script>

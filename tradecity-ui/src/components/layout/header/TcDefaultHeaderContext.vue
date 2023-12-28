<template>
  <span class="font-bold">{{ text }}</span>
</template>

<script setup lang="ts">
type TcDefaultHeaderContext = {
    text: string;
};
defineProps<TcDefaultHeaderContext>();
</script>

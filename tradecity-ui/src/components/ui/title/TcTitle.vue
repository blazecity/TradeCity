<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
type TcTitleProps = {
    title: string;
}
defineProps<TcTitleProps>();
</script>

<style scoped lang="postcss">
h1 {
  @apply text-xl text-white font-bold m-1.5;
}
</style>

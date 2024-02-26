<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
type TcTitleProps = {
    title: string;
}
defineProps<TcTitleProps>();
</script>

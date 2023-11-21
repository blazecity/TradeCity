<template>
  <div class="text-base inline py-px px-0.5 rounded-sm font-bold">{{ text }}</div>
</template>

<script setup lang="ts">
interface TcBadgeProps {
  text: string;
}
defineProps<TcBadgeProps>();
</script>

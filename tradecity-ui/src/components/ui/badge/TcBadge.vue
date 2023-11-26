<template>
  <div class="text-normal inline py-px px-0.5 rounded-sm font-bold">{{ text }}</div>
</template>

<script setup lang="ts">
interface TcBadgeProps {
  text: string;
}
defineProps<TcBadgeProps>();
</script>

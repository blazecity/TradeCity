<template>
  <button class="icon text-white" tabindex="-1">
    <tc-icon class="text-[16px]" :icon="icon" rounding="unrounded" />
  </button>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";

type TcTableIconButton = {
  icon: string;
}
defineProps<TcTableIconButton>();
</script>

<style scoped lang="postcss">
.icon {
  @apply inline-flex items-center hover:bg-base rounded-full outline-none;
}
</style>
<template>
  <div class="flex items-center gap-1 h-full px-1.5 hover:cursor-pointer hover:bg-secondary">
      <tc-icon :class="status.ok.dotColor" icon="circle" filled />
      <span>{{ description }}</span>
  </div>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import {status} from "@/components/dev/system/index";

type TcStatusBadgeProps = {
    description: string;
};
defineProps<TcStatusBadgeProps>();
</script>


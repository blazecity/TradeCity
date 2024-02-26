<template>
  <div class="flex items-center gap-1 h-full px-1.5 hover:cursor-pointer hover:bg-secondary">
      <tc-icon :class="status.dotColor" icon="circle" filled />
      <span :class="status.color">{{ description }}</span>
  </div>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import {StatusDescription} from "@/components/dev/system/index";

type TcStatusBadgeProps = {
    description: string;
    status: StatusDescription;
};
defineProps<TcStatusBadgeProps>();
</script>


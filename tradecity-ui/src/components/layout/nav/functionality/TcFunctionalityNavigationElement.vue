<template>
  <div class="flex items-center standard-hover px-1 py-px m-0.5 rounded-sm">
      <tc-icon :icon="icon" class="text-xl mr-1" />
      <span class="-mt-0.5">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";

type TcFunctionalityNavigationElement = {
    text: string;
    icon?: string;
}
withDefaults(defineProps<TcFunctionalityNavigationElement>(), {
    icon: "label"
});
</script>

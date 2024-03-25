<template>
  <div
      :class="['flex items-center standard-hover px-1 py-px m-1 rounded-sm', { 'bg-base': isSelected }]"
      @click="handleNavigationClick"
  >
      <tc-icon :icon="icon" class="text-xl mr-1" />
      <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import {useRouter} from "vue-router";

type TcFunctionalityNavigationElement = {
    text: string;
    icon?: string;
    navigationName: string;
    isSelected?: boolean;
}
const props = withDefaults(defineProps<TcFunctionalityNavigationElement>(), {
    icon: "label"
});

const router = useRouter();

// ========= EVENT HANDLERS =========

function handleNavigationClick(): void {
    router.push({ name: props.navigationName });
}
</script>

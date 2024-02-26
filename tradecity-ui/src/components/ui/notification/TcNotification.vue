<template>
  <div class="grid grid-rows-auto-fr auto-cols-fr p-1.5 bg-tertiary gap-2 rounded m-1 w-72 shadow-md">
      <!-- title -->
      <div class="flex justify-between leading-3">
          <span :class="['underline underline-offset-4 decoration-[3px] font-bold mr-3 line-clamp-1', color]">{{ title }}</span>
          <tc-icon icon="close" class="large-icon" clickable @click="handleCloseClick" />
      </div>
      <!-- body -->
      <div class="whitespace-normal break-words">
          {{ body }}
      </div>
  </div>
</template>

<script setup lang="ts">
import {NotificationLevel} from "@/components/ui/notification/index";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import {computed} from "vue";

type TcNotificationProps = {
    title: string;
    body: string;
    level: NotificationLevel;
};
const props = withDefaults(defineProps<TcNotificationProps>(), {
    level: NotificationLevel.WARNING
});

type TcNotificationEmits = {
    close: [];
};
const emits = defineEmits<TcNotificationEmits>();

const color = computed(() => {
    switch (props.level) {
        case NotificationLevel.INFO:
            return "decoration-base";
        case NotificationLevel.WARNING:
            return "decoration-yellow-400";
        case NotificationLevel.ERROR:
            return "decoration-red-500";
    }
});

// =========== EVENT HANDLERS ===========
function handleCloseClick(): void {
    emits("close");
}
</script>

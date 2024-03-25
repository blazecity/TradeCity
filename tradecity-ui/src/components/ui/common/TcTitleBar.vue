<template>
    <div class="flex items-center justify-between px-1.5 pt-1 mb-1">
        <span class="text-xs">{{ title }}</span>
        <div class="flex gap-2 items-center">
            <slot></slot>
            <tc-icon :icon="icon" class="text-[16px]" clickable @click="iconClickHandler" />
        </div>
    </div>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";

type TcTitleBarProps = {
    title: string;
    icon: string;
};
defineProps<TcTitleBarProps>();

type TcTitleBarEmits = {
    iconClick: [];
};
const emits = defineEmits<TcTitleBarEmits>();

// =========== EVENT HANDLERS ===========

function iconClickHandler(): void {
    emits("iconClick");
}
</script>

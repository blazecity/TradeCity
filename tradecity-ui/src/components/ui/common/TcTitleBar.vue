<template>
    <div class="flex justify-between p-0.5 mb-1">
        <span class="text-xs font-bold">{{ title }}</span>
        <tc-icon :icon="icon" class="text-[16px]" clickable @click="iconClickHandler" />
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

<style scoped>

</style>
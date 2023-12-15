<template>
    <tc-tooltip :text="text">
        <tc-icon class="text-xl p-1 rounded-xl" :icon="icon" clickable dark />
    </tc-tooltip>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcTooltip from "@/components/ui/tooltip/TcTooltip.vue";

type TcModuleNavigationElementProps = {
    text: string;
    icon: string;
};
defineProps<TcModuleNavigationElementProps>();
</script>

<style scoped>

</style>
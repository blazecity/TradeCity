<template>
    <tc-tooltip :text="description" direction="top">
        <div class="flex items-center rounded-sm gap-x-0.5 bg-tertiary px-0.5 py-px font-bold">
            <tc-icon :icon="icon" />
            <span>{{ text }}</span>
        </div>
    </tc-tooltip>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcTooltip from "@/components/ui/tooltip/TcTooltip.vue";
import TcBadge from "@/components/ui/badge/TcBadge.vue";

type TcOriginationPricingHeaderLabelProps = {
    icon: string;
    text: string;
    description: string;
};
defineProps<TcOriginationPricingHeaderLabelProps>();
</script>

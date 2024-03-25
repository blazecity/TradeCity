<template>
    <tc-tooltip :text="description" direction="top">
        <tc-badge class="bg-yellow-200 text-black">
            <tc-icon :icon="icon" />
            {{ text }}
        </tc-badge>
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

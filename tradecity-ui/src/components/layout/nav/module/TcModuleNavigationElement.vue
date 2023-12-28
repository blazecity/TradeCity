<template>
    <tc-tooltip :text="text">
        <tc-icon
            class="text-xl p-1" :icon="icon" clickable :durable-background="isSelected || isSelectedSoftly"
            :soft="isSelectedSoftly && !isSelected" dark rounding="rounded"
        />
    </tc-tooltip>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcTooltip from "@/components/ui/tooltip/TcTooltip.vue";
import {useRouter} from "vue-router";

type TcModuleNavigationElementProps = {
    text: string;
    icon: string;
    path: string;
    isSelected?: boolean;
    isSelectedSoftly?: boolean;
};
const props = defineProps<TcModuleNavigationElementProps>();

const router = useRouter();
</script>

<style scoped>

</style>
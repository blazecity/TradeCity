<template>
  <tc-status-badge description="System" :class="status.ok.color" @click="systemStatusClickHandler" />
</template>

<script setup lang="ts">
import TcStatusBadge from "@/components/dev/system/TcStatusBadge.vue";
import {status} from "@/components/dev/system/index";
import {moduleTree} from "@/modules/index.gen";
import {useRouter} from "vue-router";

const router = useRouter();

// =========== EVENT HANDLERS ===========
function systemStatusClickHandler(): void {
    router.push({ name: moduleTree.dev.functionalityGroups.system.functionalities.status.navigationName });
}
</script>

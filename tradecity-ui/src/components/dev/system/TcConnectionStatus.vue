<template>
  <tc-status-badge description="Connection" :status="currentStatus" />
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import TcStatusBadge from "@/components/dev/system/TcStatusBadge.vue";
import {status} from "@/components/dev/system/index";

const browserOnline = ref(navigator.onLine);
const currentStatus  = computed(() => browserOnline.value ? status.ok : status.nok);

window.ononline = () => browserOnline.value = true;
window.onoffline = () => browserOnline.value = false;
</script>

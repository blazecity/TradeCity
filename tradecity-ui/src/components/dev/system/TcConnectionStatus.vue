<template>
  <tc-status-badge description="Connection" :class="status.ok.color" />
</template>

<script setup lang="ts">
import {ref} from "vue";
import TcStatusBadge from "@/components/dev/system/TcStatusBadge.vue";
import {status} from "@/components/dev/system/index";

const browserOnline = ref(navigator.onLine);

window.ononline = () => browserOnline.value = true;
window.onoffline = () => browserOnline.value = false;
</script>

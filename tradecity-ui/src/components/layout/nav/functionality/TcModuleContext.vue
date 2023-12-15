<template>
  <div class="flex items-center justify-between shadow-dark-b py-1 px-2 font-bold">
      <router-view name="ModuleContext"></router-view>
      <tc-icon class="large-icon" icon="remove" clickable />
  </div>
</template>

<script setup lang="ts">

import TcIcon from "@/components/ui/icons/TcIcon.vue";
</script>

<style scoped>

</style>
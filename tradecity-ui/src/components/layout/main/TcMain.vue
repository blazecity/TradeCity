<template>
  <main class="">
      <router-view name="MainArea"></router-view>
      <tc-tooltip text="Topppppp  mmmmmmm">
          <tc-badge text="Top Badge" class="bg-yellow-200 text-black" />
      </tc-tooltip>
  </main>
</template>

<script setup lang="ts">
import TcTooltip from "@/components/ui/tooltip/TcTooltip.vue";
import TcBadge from "@/components/ui/badge/TcBadge.vue";
</script>

<style scoped>

</style>
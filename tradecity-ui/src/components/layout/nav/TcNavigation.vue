<template>
  <div>
      <tc-module-navigation>
        <tc-module-navigation-element icon="hub" text="Something" />
      </tc-module-navigation>
      <tc-sub-navigation>
          Szubnav
      </tc-sub-navigation>
  </div>
</template>

<script setup lang="ts">
import TcModuleNavigation from "@/components/layout/nav/module/TcModuleNavigation.vue";
import TcSubNavigation from "@/components/layout/nav/sub/TcSubNavigation.vue";
import TcModuleNavigationElement from "@/components/layout/nav/module/TcModuleNavigationElement.vue";
</script>

<style scoped>

</style>
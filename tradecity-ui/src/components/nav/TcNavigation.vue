<template>
  <div>
      <tc-module-navigation>
        <tc-module-navigation-element v-for="module in moduleTree" :icon="module.icon" :text="module.name" />
      </tc-module-navigation>
      <tc-sub-navigation>
          Szubnav
      </tc-sub-navigation>
  </div>
</template>

<script setup lang="ts">
import TcModuleNavigation from "@/components/layout/nav/module/TcModuleNavigation.vue";
import TcSubNavigation from "@/components/layout/nav/functionality/TcFunctionalityNavigation.vue";
import TcModuleNavigationElement from "@/components/layout/nav/module/TcModuleNavigationElement.vue";
import {moduleTree} from "@/modules/index.gen";
</script>

<style scoped>

</style>
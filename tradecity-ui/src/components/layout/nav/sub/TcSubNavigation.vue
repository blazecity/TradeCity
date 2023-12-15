<template>
  <div class="bg-secondary min-w-[200px]">
      <tc-module-context />
      <div>
          <tc-sub-navigation-sub-section title="Subsection">
              <tc-sub-navigation-element text="Hello" />
          </tc-sub-navigation-sub-section>
      </div>
  </div>
</template>

<script setup lang="ts">
import TcModuleContext from "@/components/layout/nav/sub/TcModuleContext.vue";
import TcSubNavigationElement from "@/components/layout/nav/sub/TcSubNavigationElement.vue";
import TcSubNavigationSubSection from "@/components/layout/nav/sub/TcSubNavigationSection.vue";
</script>

<style scoped>

</style>
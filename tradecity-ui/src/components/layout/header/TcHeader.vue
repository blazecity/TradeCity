<template>
  <header class="grid header-grid w-full h-fit">
      <div class="bg-nav-primary flex items-center justify-between w-full py-0.5 pl-0.5 pr-2 z-10">
          <tc-logo />
          <div class="w-1/3">
              <tc-string-input model-value="" placeholder="Search TradeCity" class="w-full" dark />
          </div>
          <div class="flex gap-2 items-center">
              <tc-icon icon="article" class="very-large-icon" clickable />
              <tc-icon icon="person" class="very-large-icon" clickable />
          </div>
      </div>
      <!-- subheader -->
      <div class="flex justify-between items-center bg-nav-secondary pr-3 gap-5">
          <div class="flex items-center h-full">
              <div class="flex items-center group hover:cursor-pointer" @click="toggleNavigationVisible">
                  <div class="flex items-center h-full bg-primary py-1 px-2.5 group-hover:bg-gray-500">
                      <tc-icon :icon="navigationVisible ? 'menu_open' : 'menu'" class="text-2xl" />
                      <span class="ml-1 mr-2">Menu</span>
                  </div>
                  <div class="arrow-right border-y-transparent border-r-transparent border-l-primary group-hover:border-l-gray-500"></div>
              </div>
              <tc-navigation-breadcrumbs class="m-1.5" />
          </div>
          <router-view name="HeaderContext" #="{ Component }">
              <keep-alive>
                  <component :is="Component" />
              </keep-alive>
          </router-view>
      </div>
  </header>
</template>

<script setup lang="ts">
import TcLogo from "@/components/ui/logo/TcLogo.vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import {useNavigation} from "@/stores/navigation";
import {storeToRefs} from "pinia";
import TcNavigationBreadcrumbs from "@/components/layout/header/TcNavigationBreadcrumbs.vue";

const navStore = useNavigation();
const { navigationVisible } = storeToRefs(navStore);
const { toggleNavigationVisible } = navStore;
</script>

<style scoped>
.header-grid {
    grid-template-rows: auto auto;
}

.arrow-right {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 1rem;
    z-index: 10;
}
</style>
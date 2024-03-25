<template>
  <div v-if="navigationVisible" class="flex flex-col bg-nav-secondary rounded-sm h-full">
      <div v-for="(module, moduleKey) in moduleTree">
          <!-- module title -->
          <div class="grid module gap-3 items-center px-3 py-1.5 border-t border-t-zinc-900 w-full hover:cursor-pointer" @click="() => handleModuleClick(moduleKey)">
              <tc-icon :icon="module.icon" class="very-large-icon" />
              <span class="font-bold">{{ module.name }}</span>
              <tc-icon :icon="moduleExpanded[moduleKey] ? 'expand_more' : 'chevron_right'" class="very-large-icon ml-10" clickable />
          </div>
          <!-- expanded -->
          <div class="px-2.5" v-if="moduleExpanded[moduleKey]">
              <div v-for="(functionalityGroup, funcGroupKey) in module.functionalityGroups" class="py-1.5">
                  <div class="text-neutral-400 font-bold">{{ functionalityGroup.name }}</div>
                  <div class="flex flex-col gap-1 py-1">
                      <div v-for="(functionality, funcKey) in functionalityGroup.functionalities" class="hover:bg-base hover:cursor-pointer px-1 py-0.5 rounded-sm" @click="() => handleFunctionalityClick(functionality.navigationName, moduleKey, funcGroupKey, funcKey)">
                          {{ functionality.name }}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import { reactive } from "vue";
import {moduleTree} from "@/modules";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import {useNavigation} from "@/stores/navigation";
import {storeToRefs} from "pinia";

const router = useRouter();
const navigationStore = useNavigation();
const { navigationVisible } = storeToRefs(navigationStore);
const { selectFunctionality } = navigationStore;

const moduleExpanded: {[key: keyof moduleTree]: boolean} = reactive(Object.fromEntries(Object.keys(moduleTree).map(key => [key, false])));

// ========== EVENT HANDLERS ==========
function handleModuleClick(moduleKey: string): void {
    moduleExpanded[moduleKey] = !moduleExpanded[moduleKey];
}

function handleFunctionalityClick(navigationName: string, module: string, funcGroup: string, func: string): void {
    selectFunctionality(module, funcGroup, func);
    router.push({ name: navigationName });
}
</script>

<style scoped lang="postcss">
.module {
    grid-template-columns: auto 1fr auto;
}
</style>
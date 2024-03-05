<template>
  <div class="flex">
    <!-- module navigation -->
    <div class="flex flex-col gap-2 z-30 p-2 bg-nav-primary">
      <tc-module-navigation-element
          v-for="(module, moduleKey) in moduleTree" :key="moduleKey" :icon="module.icon" :text="module.name" :path="module.path"
          :navigation-name="module.navigationName" :is-selected="moduleKey === selectedModuleByRoute"
          :is-selected-softly="moduleKey === selectedModuleKey" @click="() => handleModuleClick(moduleKey as unknown as string)"
      />
    </div>
    <!-- functionality navigation -->
    <div :class="['grid grid-rows-auto-fr min-w-[200px] z-20', {'hidden': !functionalitiesVisible}]">
      <div class="flex items-center justify-between py-1 px-2 font-bold h-7 bg-nav-secondary border-b border-neutral-950">
        <span v-if="selectedModule">{{ selectedModule.name }}</span>
        <tc-icon class="large-icon" icon="remove" clickable @click="handleCollapseClick"  />
      </div>
      <div class="h-full bg-nav-secondary">
        <tc-functionality-navigation-section
            v-for="(functionalityGroup, functionalityGroupKey) in functionalityGroups"
            :key="functionalityGroupKey" :title="functionalityGroup.name"
        >
          <tc-functionality-navigation-element
              v-if="functionalityGroup.functionalities" v-for="(functionality, functionalityKey) in functionalityGroup.functionalities"
              :key="functionalityKey" :text="functionality.name" :navigation-name="functionality.navigationName"
              :is-selected="functionalityKey as unknown as string === selectedFunctionality"
          />
        </tc-functionality-navigation-section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import {moduleTree} from "@/modules/index.gen";
import type {ModuleSchema} from "@/modules/index.gen";
import TcModuleNavigationElement from "@/components/layout/nav/module/TcModuleNavigationElement.vue";
import TcFunctionalityNavigationElement from "@/components/layout/nav/functionality/TcFunctionalityNavigationElement.vue";
import TcFunctionalityNavigationSection from "@/components/layout/nav/functionality/TcFunctionalityNavigationSection.vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";

const route = useRoute();

type ModuleKey = keyof ModuleSchema;

const selectedModuleKey = ref("home");
const selectedModule = computed(() => moduleTree[selectedModuleKey.value as ModuleKey]);
const selectedModuleByRoute = computed(() => Object.keys(moduleTree).find(moduleKey =>
        !!route.matched.find(match => match.name === moduleTree[moduleKey as ModuleKey].navigationName))
);
const functionalityGroups = computed(() => moduleTree[selectedModuleKey.value as ModuleKey].functionalityGroups);
const selectedFunctionality = computed(() => {
    const fGroups = functionalityGroups.value;
    if (fGroups) {
        for (const groupKey in fGroups) {
            const functionalities = fGroups[groupKey].functionalities;
            if (functionalities) {
                const result = Object.keys(functionalities).find(functionalityKey =>
                    !!route.matched.find(match => match.name === functionalities[functionalityKey].navigationName));
                if (result) {
                    return result;
                }
            }
        }

    }
});
const functionalitiesVisible = ref(false);

// ========== EVENT HANDLERS ==========
function handleModuleClick(moduleKey: string): void {
    functionalitiesVisible.value = true;
    selectedModuleKey.value = moduleKey;
}

function handleCollapseClick(): void {
    functionalitiesVisible.value = false;
}
</script>

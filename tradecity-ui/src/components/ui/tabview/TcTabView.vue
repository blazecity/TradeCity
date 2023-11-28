<template>
  <div class="grid grid-rows-auto-fr text-xs w-full h-full">
    <!-- tab registers -->
    <div class="border-b-zinc-800 border-b-[1px]">
      <div
          v-for="tab in tabs" :key="tab.id"
          :class="['inline-block border-b-4 border-base px-2.5 py-1 hover:cursor-pointer',  activeTab === tab.id ? 'font-bold border-tc-blue bg-tertiary' : 'hover:bg-tertiary border-neutral-500']"
          @click="() => switchTab(tab.id)"
      >
        {{ tab.label }}
      </div>
    </div>
    <!-- tab view body -->
    <div>
      <template v-for="tab in tabs" :key="tab.id" >
        <component v-if="activeTab === tab.id" :is="tab.component"></component>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, useSlots, watch} from "vue";
import type {VNode} from "vue";

type TabItem = {
  id: string;
  label: string;
  component: VNode;
}

const slots = useSlots();

const activeTab = ref("");

const tabs = computed(() => {
  const defaultSlot = slots.default;
  if (defaultSlot) {
    return defaultSlot().reduce((tabs: Array<TabItem>, child) => {
      if (
          child.props &&
          "label" in child.props &&
          "id" in child.props &&
          typeof child.props.label === "string" &&
          typeof child.props.id === "string"
      ) {
        tabs.push({
          id: child.props.id,
          label: child.props.label,
          component: child
        });
      }

      return tabs;
    }, []);
  }

  return [];
});
watch(tabs, newTabs => {
  if (activeTab.value === "" && newTabs.length > 1) {
    activeTab.value = newTabs[0].id;
  }
}, {immediate: true});

// ============ EVENT HANDLERS ============
function switchTab(id: string) {
  activeTab.value = id;
}
</script>

<style scoped>

</style>
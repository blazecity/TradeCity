<template>
  <div class="grid grid-rows-auto-fr w-full h-full">
    <!-- tab registers -->
    <div class="flex items-center justify-between gap-1">
      <div>
        <div
            v-for="tab in tabHeaders" :key="tab.id"
            :class="[
              'inline-block px-2 py-1 text-small hover:cursor-pointer border-b-[3px]',
              activeTab === tab.id ? 'font-bold border-base' : 'border-transparent hover:bg-tertiary',
          ]"
            @click="() => handleTabSwitch(tab.id)"
        >
          <slot :name="'register.' + tab.id">
            {{ tab.label }}
          </slot>
        </div>
      </div>
      <div class="px-1">
        <slot name="tabHeader"></slot>
      </div>
    </div>
    <!-- tab view body -->
    <div class="overflow-hidden pt-2">
      <slot :active-tab="activeTab"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {TcTabHeaders} from "@/components/ui/tabview/index";

type TcTabViewProps = {
  tabHeaders: TcTabHeaders
}
const props = defineProps<TcTabViewProps>();

const activeTab = ref(props.tabHeaders.length > 0 ? props.tabHeaders[0].id : "");

// ============ EVENT HANDLERS ============

function handleTabSwitch(id: string) {
  activeTab.value = id;
}
</script>

<style scoped>
.selected-tab {
    background-color: rgba(156, 163, 175, 0.5);
}
</style>
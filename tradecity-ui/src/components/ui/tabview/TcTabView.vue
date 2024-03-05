<template>
  <div class="grid grid-rows-auto-fr text-xs w-full h-full bg-primary pt-1">
    <!-- tab registers -->
    <div class="pl-1 flex items-center justify-between border-b border-b-zinc-800">
      <div>
        <div
            v-for="tab in tabHeaders" :key="tab.id"
            :class="[
              'inline-block px-2 py-1 hover:cursor-pointer border-b-[3px]',
              activeTab === tab.id ? ' border-b-base tab-background' : 'border-gray-600 hover:bg-tertiary',
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
    <div class="overflow-hidden">
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
.tab-background {
  background-color: rgba(150, 176, 246, 0.15);
}
</style>
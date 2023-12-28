<template>
  <div class="grid grid-rows-auto-fr bg-secondary rounded-sm m-1 p-0.5">
      <tc-title-bar :title="title" :icon="collapsed ? 'south' : 'north'" class="hover:cursor-pointer" @click="toggleCollapseHandler" />
      <div :class="['p-1', {'hidden': collapsed}]">
          <slot></slot>
      </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import TcTitleBar from "@/components/ui/common/TcTitleBar.vue";

type TcCollapsablePanelProps = {
    title: string;

};
defineProps<TcCollapsablePanelProps>();

const collapsed = ref(false);

// ========= EVENT HANDLERS =========
function toggleCollapseHandler(): void {
    collapsed.value = !collapsed.value;
}
</script>

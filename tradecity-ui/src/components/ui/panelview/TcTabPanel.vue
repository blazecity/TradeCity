<template>
  <div :class="[
      'overflow-hidden bg-secondary rounded-sm',
      expanded ? 'col-span-full row-span-full' : 'group-[.panel-expanded]:hidden panel'
  ]">
    <tc-tab-view :tab-headers="tabHeaders" class="h-full">
      <template #tabHeader>
        <div class="flex items-center">
          <slot name="tabHeader"></slot>
          <tc-icon :icon="expanded ? 'close_fullscreen' : 'open_in_full'" class="ml-2 text-[14px] h-fit text-neutral-300" clickable @click="handleExpandClick" />
        </div>
        </template>
      <template #default="{ activeTab }">
        <slot :active-tab="activeTab"></slot>
      </template>
    </tc-tab-view>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import TcTitleBar from "@/components/ui/common/TcTitleBar.vue";
import TcTabView from "@/components/ui/tabview/TcTabView.vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import type {TcTabHeaders} from "@/components/ui/tabview";

type TcTabPanelProps = {
  cols: number;
  rows: number;
  expansionHandler: (isExpanded: boolean) => void;
  tabHeaders: TcTabHeaders;
};
const props = defineProps<TcTabPanelProps>();

const expanded = ref(false);

// ============ EVENT HANDLERS ============

function handleExpandClick(): void {
  expanded.value = !expanded.value;
  props.expansionHandler(expanded.value);
}
</script>

<style scoped>
.panel {
  grid-column: span v-bind("cols") / span v-bind("cols");
  grid-row: span v-bind("rows") / span v-bind("rows");
}
</style>

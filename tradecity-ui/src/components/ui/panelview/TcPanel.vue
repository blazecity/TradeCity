<template>
  <div :class="['grid grid-rows-auto-fr bg-secondary p-0.5 overflow-hidden', expanded ? 'col-span-full row-span-full' : 'group-[.panel-expanded]:hidden panel']">
      <div class="flex justify-between p-0.5 mb-1">
          <span class="text-xs font-bold">{{ title }}</span>
          <tc-icon :icon="expanded ? 'close_fullscreen' : 'open_in_full'" class="text-[16px]" clickable @click="expandClickHandler" />
      </div>
      <div class="overflow-auto scrollbar">
          <slot></slot>
      </div>
  </div>
</template>

<script setup lang="ts">
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import {ref} from "vue";

type TcPanelProps = {
    title: string;
    cols: number;
    rows: number;
    expansionHandler: (isExpanded: boolean) => void;
};
const props = defineProps<TcPanelProps>();

const expanded = ref(false);

// ============ EVENT HANDLERS ============
function expandClickHandler(): void {
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

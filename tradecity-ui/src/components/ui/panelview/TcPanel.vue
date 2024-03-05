<template>
  <div :class="[
      'grid grid-rows-auto-fr overflow-hidden bg-secondary rounded-sm',
      expanded ? 'col-span-full row-span-full' : 'group-[.panel-expanded]:hidden panel'
  ]">
      <tc-title-bar :title="title" :icon="expanded ? 'close_fullscreen' : 'open_in_full'" @icon-click="handleExpandClick" />
      <div class="overflow-auto min-w-0 min-h-0 scrollbar">
          <slot></slot>
      </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import TcTitleBar from "@/components/ui/common/TcTitleBar.vue";
import TcTabView from "@/components/ui/tabview/TcTabView.vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";

type TcPanelProps = {
    title?: string;
    cols: number;
    rows: number;
    expansionHandler: (isExpanded: boolean) => void;
};
const props = withDefaults(defineProps<TcPanelProps>(), {
  title: ""
});

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

<template>
  <div :class="['grid bg-black gap-px group', {'panel-expanded': hasExpandedPanel}]">
      <slot :expansion-handler="expansionHandler"></slot>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const hasExpandedPanel = ref(false);

function expansionHandler(isExpanded: boolean): void {
    hasExpandedPanel.value = isExpanded;
}
</script>
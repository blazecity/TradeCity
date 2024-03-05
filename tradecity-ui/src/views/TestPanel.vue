<script setup lang="ts">

import TcPanelView from "@/components/ui/panelview/TcPanelView.vue";
import TcPanel from "@/components/ui/panelview/TcPanel.vue";
</script>

<template>
 <tc-panel-view class="grid-cols-2 grid-rows-2" #default="{expansionHandler}">
   <tc-panel :rows="1" :cols="1" :expansion-handler="expansionHandler">
     A
   </tc-panel>
   <tc-panel :rows="1" :cols="1" :expansion-handler="expansionHandler">
     B
   </tc-panel>
   <tc-panel :rows="1" :cols="2" :expansion-handler="expansionHandler">
     <div class="bg-gray-500 h-[1000px]">
Helo
     </div>
   </tc-panel>
 </tc-panel-view>
</template>

<style scoped>

</style>
<template>
  <tc-tab-view>
      <tc-tab id="comparables" label="Comparables">
          Comparables
      </tc-tab>
      <tc-tab id="secMarket" label="Secondary Market">
          SecondaryMarket
      </tc-tab>
      <tc-tab id="pricingHistory" label="Pricing History">
          Pricing History
      </tc-tab>
  </tc-tab-view>
</template>

<script setup lang="ts">
import TcTabView from "@/components/ui/tabview/TcTabView.vue";
import TcTab from "@/components/ui/tabview/TcTab.vue";
</script>

<style>
.x {
    background-color: #5389f5;
}
</style>
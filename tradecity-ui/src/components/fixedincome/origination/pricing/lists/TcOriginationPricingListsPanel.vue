<template>
  <tc-tab-panel :rows="1" :cols="4" :expansion-handler="expansionHandler" :tab-headers="tabHeaders" #="{ activeTab }">
    <tc-tab id="comparables" :active-id="activeTab">
      <div class="overflow-hidden h-full">
        <tc-comparables-table />
      </div>
    </tc-tab>
    <tc-tab id="secMarket" label="Secondary Market" :active-id="activeTab">
      <tc-secondary-market-table />
    </tc-tab>
    <tc-tab id="pricingHistory" label="Pricing History" :active-id="activeTab">
      Pricing History
    </tc-tab>
  </tc-tab-panel>
</template>

<script setup lang="ts">
import TcTab from "@/components/ui/tabview/TcTab.vue";
import TcTabPanel from "@/components/ui/panelview/TcTabPanel.vue";
import TcComparablesTable from "@/components/fixedincome/origination/pricing/lists/TcComparablesTable.vue";
import TcSecondaryMarketTable from "@/components/fixedincome/origination/pricing/lists/TcSecondaryMarketTable.vue";

type TcOriginationPricingListsPanel = {
  expansionHandler: (isExpanded: boolean) => void;
}
defineProps<TcOriginationPricingListsPanel>();

const tabHeaders = [
  { id: "comparables", label: "Comparables" },
  { id: "secMarket", label: "Secondary Market" },
  { id: "pricingHistory", label: "Pricing History" },
]
</script>
<template>
  <tc-panel-view class="pricing-grid" #default="{ expansionHandler }">
    <tc-tab-panel :rows="1" :cols="2" :expansion-handler="expansionHandler" :tab-headers="chartPanelHeaders" #="{ activeTab }">
      <tc-tab id="chart" :active-id="activeTab">
        <tc-origination-pricing-chart />
      </tc-tab>
    </tc-tab-panel>
    <tc-origination-pricing-lists-panel :expansion-handler="expansionHandler" />
    <tc-dialog :title="addPricingLabel" v-model:open="newPricingOpen">
      <tc-origination-pricing-editor @cancel="newPricingOpen = false"/>
    </tc-dialog>
    <tc-tab-panel
        title="Bond Pricing" :rows="1" :cols="6" :expansion-handler="expansionHandler" :tab-headers="pricingPanelHeaders"
    >
      <template #tabHeader>
        <tc-button styling="dark" @click="openNewPricingWindow">
          <span>{{ addPricingLabel }}</span>
        </tc-button>
      </template>
      <template #default="{ activeTab }">
        <tc-tab id="pricing" :active-id="activeTab" class="overflow-hidden">
          <tc-origination-pricing-table/>
          <tc-origination-pricing-table/>
          <tc-origination-pricing-table/>
        </tc-tab>
      </template>
    </tc-tab-panel>
  </tc-panel-view>
</template>

<script setup lang="ts">
import TcPanelView from "@/components/ui/panelview/TcPanelView.vue";
import TcPanel from "@/components/ui/panelview/TcPanel.vue";
import TcOriginationPricingTable
  from "@/components/fixedincome/origination/pricing/table/TcOriginationPricingTable.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import {useQuery} from "@vue/apollo-composable";
import {graphql} from "@/gql/gql";
import {ref} from "vue";
import TcDialog from "@/components/ui/dialog/TcDialog.vue";
import TcOriginationPricingEditor
  from "@/components/fixedincome/origination/pricing/table/TcOriginationPricingEditor.vue";
import TcOriginationPricingChart
  from "@/components/fixedincome/origination/pricing/chart/TcOriginationPricingChart.vue";
import {useBrowserWindow} from "@/composables/window";
import TcTabPanel from "@/components/ui/panelview/TcTabPanel.vue";
import TcTab from "@/components/ui/tabview/TcTab.vue";
import TcOriginationPricingListsPanel
  from "@/components/fixedincome/origination/pricing/lists/TcOriginationPricingListsPanel.vue";

const addPricingLabel = "Add Pricing";

const newPricingOpen = ref(true);

// const { result } = useQuery(graphql(`
//     query Query {
//         temp {
//             b
//         }
//     }
// `));
//"http://localhost:5173/test"

const message = ref("Before");

const chartPanelHeaders = [
  { id: "chart", label: "Pricing Chart" }
];

const pricingPanelHeaders = [
  { id: "pricing", label: "Pricing Tables" }
];

const openNewPricingWindow = useBrowserWindow<string>(
    "/add_pricing",
    msg => message.value = msg.data,
    console.log,
    () => message.value = "got closed"
);
</script>

<style scoped>
.pricing-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}
</style>
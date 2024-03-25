<template>
  <tc-panel-view class="pricing-grid" #default="{ expansionHandler }">
    <tc-panel title="Pricing Chart" :rows="1" :cols="2" :expansion-handler="expansionHandler">
        <tc-origination-pricing-chart />
    </tc-panel>
    <tc-origination-pricing-lists-panel :expansion-handler="expansionHandler" />
    <tc-panel title="Bond Pricing" :rows="1" :cols="6" :expansion-handler="expansionHandler">
        <template #bar>
            <tc-button plain @click="() => {}">
                <tc-icon icon="add" class="large-icon" />
                Add Pricing
            </tc-button>
        </template>
      <template #default>
          <tc-origination-pricing-table/>
          <tc-origination-pricing-table/>
          <tc-origination-pricing-table/>
      </template>
    </tc-panel>
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
import TcOriginationPricingChart
  from "@/components/fixedincome/origination/pricing/chart/TcOriginationPricingChart.vue";
import TcOriginationPricingListsPanel
  from "@/components/fixedincome/origination/pricing/lists/TcOriginationPricingListsPanel.vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";

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
</script>

<style scoped>
.pricing-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}
</style>
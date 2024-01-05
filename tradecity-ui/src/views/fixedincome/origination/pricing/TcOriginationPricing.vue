<template>
  <tc-panel-view class="h-full w-full pricing-grid" #default="{ expansionHandler }">
      <tc-panel title="CHF Bond Pricing" :rows="1" :cols="6" :expansion-handler="expansionHandler">
          <div class="flex items-center justify-between mb-1">
              <tc-combo-box placeholder="Issuer" :items="[]" class="w-72" />
              <tc-badge text="S&P A+ / ZKB A / Fedafin A-" class="bg-base" />
              <div>
                  <tc-button plain @click="newPricingOpen = true">
                      <tc-icon icon="add" class="large-icon" />
                      <span>{{ addPricingLabel }}</span>
                  </tc-button>
                  <tc-button plain>
                      <tc-icon icon="save" class="large-icon" />
                      <span>Save All</span>
                  </tc-button>
              </div>
          </div>
          <tc-origination-pricing-table />
      </tc-panel>
      <tc-panel title="Pricing Comparison Chart" :rows="1" :cols="2" :expansion-handler="expansionHandler">
          <tc-origination-pricing-chart />
      </tc-panel>
      <tc-panel title="Bond Lists" :rows="1" :cols="4" :expansion-handler="expansionHandler">
          <tc-origination-pricing-lists />
      </tc-panel>
      <tc-dialog :title="addPricingLabel" v-model:open="newPricingOpen">
          <tc-origination-pricing-editor @cancel="newPricingOpen = false" />
      </tc-dialog>
  </tc-panel-view>
</template>

<script setup lang="ts">
import TcPanelView from "@/components/ui/panelview/TcPanelView.vue";
import TcPanel from "@/components/ui/panelview/TcPanel.vue";
import TcOriginationPricingTable from "@/components/fixedincome/origination/pricing/table/TcOriginationPricingTable.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import {useQuery} from "@vue/apollo-composable";
import {graphql} from "@/gql/gql";
import {computed, ref} from "vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcComboBox from "@/components/ui/combobox/TcComboBox.vue";
import TcBadge from "@/components/ui/badge/TcBadge.vue";
import TcDialog from "@/components/ui/dialog/TcDialog.vue";
import TcOriginationPricingEditor from "@/components/fixedincome/origination/pricing/table/TcOriginationPricingEditor.vue";
import TcOriginationPricingLists from "@/components/fixedincome/origination/pricing/lists/TcOriginationPricingLists.vue";
import TcOriginationPricingChart from "@/components/fixedincome/origination/pricing/chart/TcOriginationPricingChart.vue";

const addPricingLabel = "Add Pricing";

const newPricingOpen = ref(true);

const { result, loading } = useQuery(graphql(`
    query Query {
        temp {
            b
        }
    }
`));
const x = computed(() => {
    if (result.value) {
        return result.value.temp.b
    }
});
</script>

<style scoped>
.pricing-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
}
</style>
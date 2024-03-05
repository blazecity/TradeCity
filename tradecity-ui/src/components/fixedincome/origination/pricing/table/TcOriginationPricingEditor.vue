<template>
  <tc-ok-cancel-container>
    <div class="pricing-grid p-1.5 gap-y-0.5 gap-x-2">
      <span>Description</span>
      <tc-string-input v-model="description" placeholder="Description" />
      <span>Collateral</span>
      <tc-combo-box placeholder="Collateral" :items="[]" :level="1" />
      <span>Coupon Frequency</span>
      <tc-combo-box placeholder="Coupon Frequency" :items="[]" :level="1" />
      <span>Cross Currency Comparison</span>
      <tc-combo-box placeholder="Ccy Comparison" :items="[]" :level="1" />
      <span>Coupon Paying Agent Fee (bps)</span>
      <tc-number-input v-model="couponPayingAgentFeeInBps" placeholder="Cp pay agent fee" />
      <span>Redemption Fee (bps)</span>
      <tc-number-input v-model="redemptionFeeInBps" placeholder="Red fee" />
      <span>Out-of-pocket Fee (CHF)</span>
      <tc-number-input v-model="outOfPocketFee" placeholder="Out of pocket fee" />
      <span>Tenor</span>
      <tc-number-input v-model="tenor" placeholder="Tenor" />
    </div>
  </tc-ok-cancel-container>
</template>

<script setup lang="ts">
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import {reactive, ref} from "vue";
import TcOkCancelContainer from "@/components/ui/common/TcOkCancelContainer.vue";
import TcCollapsablePanel from "@/components/ui/collapsablepanel/TcCollapsablePanel.vue";
import TcComboBox from "@/components/ui/combobox/TcComboBox.vue";
import TcNumberInput from "@/components/ui/input/TcNumberInput.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcTable from "@/components/ui/table/TcTable.vue";
import TcTableNumberInput from "@/components/ui/table/TcTableNumberInput.vue";

const description = ref("");
const couponPayingAgentFeeInBps = ref(0);
const redemptionFeeInBps = ref(0);
const outOfPocketFee = ref(0);
const tenor = ref(2);
const removeVisible = ref(false);
const tenorTableHeaders = {
    defaultGroup: {
        headers: {
            tenor: "Tenor"
        }
    }
};

type TenorTableData = {
    tenor: number;
}

const tableData = reactive<Array<TenorTableData>>([]);

// =========== EVENT HANDLERS ===========

function handleAddTenorClick(increase: number): void {
    tenor.value += increase;
    tableData.push({
        tenor: tenor.value
    });
}

function handleAddDefaultTenorClick(): void {
    tableData.length = 0;
    tableData.push(
        { tenor:  1},
        { tenor:  2},
        { tenor:  3},
        { tenor:  4},
        { tenor:  5},
        { tenor:  6},
        { tenor:  7},
        { tenor:  8},
        { tenor:  9},
        { tenor:  10},
        { tenor:  11},
        { tenor:  12},
        { tenor:  13},
        { tenor:  14},
        { tenor:  15},
        { tenor:  20},
        { tenor:  25},
        { tenor:  30},
    );
}

function handleTableSelectionChange(data: Array<TenorTableData>): void {
    removeVisible.value = data.length > 0;
}
</script>

<style scoped>
.pricing-grid {
  display: grid;
  grid-template-columns: auto 1fr;
}
</style>
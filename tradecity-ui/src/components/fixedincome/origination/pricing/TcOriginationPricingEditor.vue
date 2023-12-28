<template>
  <tc-ok-cancel-container class="w-[75vw]">
      <tc-collapsable-panel title="General">
          <div class="grid grid-cols-3 gap-x-4 gap-y-1">
              <tc-string-input v-model="description" placeholder="Description" with-label class="w-full" />
              <tc-combo-box placeholder="Collateral" :items="[]" :level="1" with-label />
              <tc-combo-box placeholder="Coupon Frequency" :items="[]" :level="1" with-label />
              <tc-combo-box placeholder="Ccy Comparison" :items="[]" :level="1" with-label />
          </div>
      </tc-collapsable-panel>
      <tc-collapsable-panel title="Fees">
          <div class="grid grid-cols-3 gap-x-4 gap-y-1 items-center">
              <tc-number-input v-model="couponPayingAgentFeeInBps" placeholder="Cp pay agent fee" with-label />
              <tc-number-input v-model="redemptionFeeInBps" placeholder="Red fee" with-label />
              <tc-number-input v-model="outOfPocketFee" placeholder="Out of pocket fee" with-label />
          </div>
      </tc-collapsable-panel>
      <tc-collapsable-panel title="Tenors">
          <div class="grid grid-cols-1 gap-y-1">
              <div class="flex items-center gap-1.5">
                  <tc-number-input v-model="tenor" placeholder="Tenor" with-label />
                  <tc-button plain @click="() => addTenorClickHandler(0)">
                      <tc-icon icon="add" class="large-icon" />
                      <span>Add</span>
                  </tc-button>
                  <tc-button plain @click="() => addTenorClickHandler(1)">
                      <tc-icon icon="upgrade" class="large-icon" />
                      <span>Add +1</span>
                  </tc-button>
                  <tc-button plain @click="() => addTenorClickHandler(5)">
                      <tc-icon icon="upgrade" class="large-icon" />
                      <span>Add +5</span>
                  </tc-button>
                  <tc-button plain @click="addDefaultTenorClickHandler">
                      <tc-icon icon="format_list_numbered" class="large-icon" />
                      <span>Add Default Range</span>
                  </tc-button>
                  <tc-button v-if="removeVisible" plain dangerous>
                      <tc-icon icon="remove" class="large-icon" />
                      <span>Remove</span>
                  </tc-button>
              </div>
              <div class="bg-dark p-1 h-48">
                  <tc-table
                      :headers="tenorTableHeaders" :data="tableData" description="" selectable
                      @selection-changed="tableSelectionChangedHandler"
                  >
                      <template #data.tenor="{ dataIndex }">
                          <tc-table-number-input :decimal-places="1" v-model="tableData[dataIndex].tenor" />
                      </template>
                  </tc-table>
              </div>
          </div>
      </tc-collapsable-panel>
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

function addTenorClickHandler(increase: number): void {
    tenor.value += increase;
    tableData.push({
        tenor: tenor.value
    });
}

function addDefaultTenorClickHandler(): void {
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

function tableSelectionChangedHandler(data: Array<TenorTableData>): void {
    removeVisible.value = data.length > 0;
}
</script>

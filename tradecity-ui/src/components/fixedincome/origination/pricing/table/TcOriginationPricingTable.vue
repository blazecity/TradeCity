<template>
    <div class="flex gap-2 w-full my-2 p-2">
        <div class="p-1.5 bg-secondary rounded-sm w-full">
            <div class="flex items-center gap-2 justify-between">
                <div class="flex gap-4">
                    <tc-badge class="bg-blue-300 text-black">{{ collateral }}</tc-badge>
                    <div class="flex items-center gap-1">
                        <tc-origination-pricing-header-label icon="replay" description="Coupon paying agent fee" text="1 bps"/>
                        <tc-origination-pricing-header-label icon="planner_review" description="Payment frequency" text="1/1"/>
                        <tc-origination-pricing-header-label icon="reply" description="Redemption fee" text="1 bps"/>
                        <tc-origination-pricing-header-label icon="contract" description="Out of pocket fee" :text="outOfPocketFee.toString()"/>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="flex">
                        <tc-button plain @click="handleShowSettingsPanel">
                            <tc-icon icon="edit" class="very-large-icon"/>
                            Edit Pricing
                        </tc-button>
                        <tc-button plain dangerous>
                            <tc-icon icon="remove" class="very-large-icon" />
                            Delete Pricing
                        </tc-button>
                    </div>
                    <tc-switch v-model="released">Released</tc-switch>
                </div>
            </div>
            <tc-table class="mt-1.5" :headers="tableHeaders" :data="tableData" description="Bond Pricing" grouped finite>
                <template #data.tenor="{ dataIndex }">
                    <tc-table-number-input v-model="tableData[dataIndex].tenor"  :decimal-places="1" unit="yrs" class="w-[4.4rem]" centered />
                </template>
                <template #data.msFixVsSaron="{ dataIndex }">
                    <tc-table-immutable-number :value="tableData[dataIndex].msFixVsSaron" :decimal-places="3"/>
                </template>
                <template #header.reofferSpread="{ label }">
                    <tc-table-plus-minus-header @increase="handleReofferSpreadIncrease" @decrease="handleReofferSpreadDecrease">{{ label }}</tc-table-plus-minus-header>
                </template>
                <template #data.reofferSpread="{ dataIndex }">
                    <tc-table-number-input
                        v-model="tableData[dataIndex].reofferSpread" class="w-full" :decimal-places="1" with-border
                        with-plus-minus centered
                        :first="dataIndex === 0"
                    />
                </template>
                <template #header.netFee="{ label }">
                    <tc-table-plus-minus-header @increase="handleNetFeeIncrease" @decrease="handleNetFeeDecrease">{{ label }}</tc-table-plus-minus-header>
                </template>
                <template #data.netFee="{ dataIndex }">
                    <tc-table-number-input
                        v-model="tableData[dataIndex].netFee" class="w-full" :decimal-places="1" with-border
                        with-plus-minus centered :first="dataIndex === 0"
                    />
                </template>
                <template #data.reofferYield="{ dataIndex }">
                    <tc-table-immutable-number :value="tableData[dataIndex].reofferYield" :decimal-places="3"/>
                </template>
                <template #data.coupon="{ dataIndex }">
                    <tc-table-immutable-number :value="tableData[dataIndex].coupon" :decimal-places="3"/>
                </template>
                <template #data.chfAllInYield="{ dataIndex }">
                    <tc-table-immutable-number :value="tableData[dataIndex].chfAllInYield" :decimal-places="3"/>
                </template>
                <template #data.allInSpreadVsSaron="{ dataIndex }">
                    <tc-table-immutable-number :value="tableData[dataIndex].allInSpreadVsSaron" :decimal-places="3"/>
                </template>
            </tc-table>
        </div>
        <tc-origination-pricing-table-settings
            v-if="showSettingsPanel"
            @close="handleShowSettingsPanel"
            v-model:collateral="collateral"
            v-model:couponPayingAgentFee="couponPayingAgentFee"
            v-model:paymentFrequency="paymentFrequency"
            v-model:redemptionFee="redemptionFee"
            v-model:outOfPocketFee="outOfPocketFee"
            v-model:notes="notes"
        />
    </div>
</template>

<script setup lang="ts">
import TcTable from "@/components/ui/table/TcTable.vue";
import {reactive, ref, watch} from "vue";
import TcTableNumberInput from "@/components/ui/table/TcTableNumberInput.vue";
import TcTableImmutableNumber from "@/components/ui/table/TcTableImmutableNumber.vue";
import TcBadge from "@/components/ui/badge/TcBadge.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcOriginationPricingHeaderLabel
  from "@/components/fixedincome/origination/pricing/table/TcOriginationPricingHeaderLabel.vue";
import TcSwitch from "@/components/ui/switch/TcSwitch.vue";
import TcTablePlusMinusHeader from "@/components/ui/table/TcTablePlusMinusHeader.vue";
import TcOriginationPricingTableSettings
    from "@/components/fixedincome/origination/pricing/table/TcOriginationPricingTableSettings.vue";
import TcTableStringInput from "@/components/ui/table/TcTableStringInput.vue";

const tableHeaders = reactive({
  baseGroup: {
    label: "",
    headers: {
      tenor: "Tenor",
      msFixVsSaron: "MS fix vs SARON",
      reofferSpread: "Ro sprd",
      reofferYield: "Reoffer yd",
      coupon: "Coupon",
      netFee: "Net fee"
    }
  },
  allInBondPricing: {
    label: "CHF All-in Bond Pricing",
    headers: {
      chfAllInYield: "All-in yld",
      allInSpreadVsSaron: "vs SARON MS"
    }
  }
});

const tableData = reactive([
  {
    tenor: 2,
    msFixVsSaron: 12,
    reofferSpread: 1,
    netFee: 0,
    coupon: 1,
    reofferYield: 2,
    chfAllInYield: 4,
    allInSpreadVsSaron: 5
  },
  {
    tenor: 3,
    msFixVsSaron: 12,
    reofferSpread: 1,
    netFee: 0,
    coupon: 1,
    reofferYield: 2,
    chfAllInYield: 4,
    allInSpreadVsSaron: 5
  },
  {
    tenor: 4,
    msFixVsSaron: 12,
    reofferSpread: 1,
    netFee: 0,
    coupon: 1,
    reofferYield: 2,
    chfAllInYield: 4,
    allInSpreadVsSaron: 5
  },
  {
    tenor: 5,
    msFixVsSaron: 12,
    reofferSpread: 1,
    netFee: 0,
    coupon: 1,
    reofferYield: 2,
    chfAllInYield: 4,
    allInSpreadVsSaron: 5
  },
  {
    tenor: 6,
    msFixVsSaron: 12,
    reofferSpread: 1,
    netFee: 0,
    coupon: 1,
    reofferYield: 2,
    chfAllInYield: 4,
    allInSpreadVsSaron: 5
  },
  {
    tenor: 7,
    msFixVsSaron: 12,
    reofferSpread: 1,
    netFee: 0,
    coupon: 1,
    reofferYield: 2,
    chfAllInYield: 4,
    allInSpreadVsSaron: 5
  },
]);

const released = ref(false);
const collateral = ref("Senior preferred");
const couponPayingAgentFee = ref(1);
const paymentFrequency = ref("Annual");
const redemptionFee = ref(1);
const outOfPocketFee = ref(15000);
const notes = ref("");
const showSettingsPanel = ref(true);

// ========== EVENT HANDLERS ==========

const handleReofferSpreadIncrease = () => tableData.forEach(entry => entry.reofferSpread += 1);
const handleReofferSpreadDecrease = () => tableData.forEach(entry => entry.reofferSpread -= 1);
const handleNetFeeIncrease = () => tableData.forEach(entry => entry.netFee += 1);
const handleNetFeeDecrease = () => tableData.forEach(entry => entry.netFee -= 1);
const handleShowSettingsPanel = () => { showSettingsPanel.value = !showSettingsPanel.value };
</script>
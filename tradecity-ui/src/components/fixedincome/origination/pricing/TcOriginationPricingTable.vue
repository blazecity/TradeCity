<template>
    <div class="p-1.5 bg-dark rounded-sm">
        <div class="flex items-center gap-2 justify-between">
            <tc-badge :text="pricingDescription" class="bg-yellow-200 text-black" />
            <div class="flex items-center gap-1">
                <tc-origination-pricing-header-label icon="replay" description="Coupon paying agent fee" text="1 bps" />
                <tc-origination-pricing-header-label icon="planner_review" description="Payment frequency" text="1/1" />
                <tc-origination-pricing-header-label icon="reply" description="Redemption fee" text="1 bps" />
                <tc-origination-pricing-header-label icon="contract" description="Out of pocket fee" text="15'000" />
            </div>
            <div>
                <tc-button plain>
                    <tc-icon icon="edit" class="large-icon" />
                    <span>Edit Pricing Parameters</span>
                </tc-button>
                <tc-button plain dangerous>
                    <tc-icon icon="remove" class="large-icon" />
                    <span>Remove Pricing</span>
                </tc-button>
            </div>
        </div>
        <tc-table class="mt-1.5" :headers="tableHeaders" :data="tableData" description="Bond Pricing" grouped sub-header>
            <template #data.msFixVsSaron="{ dataIndex }">
                <tc-table-immutable-number :value="tableData[dataIndex].msFixVsSaron" :decimal-places="3" />
            </template>
            <template #subheader.reofferSpread="{ dataIndex }">
                <tc-table-number-input v-model="reofferSpreadAll" class="w-20" :decimal-places="1" />
            </template>
            <template #data.reofferSpread="{ dataIndex }">
                <tc-table-number-input v-model="tableData[dataIndex].reofferSpread" class="w-20" :decimal-places="1" />
            </template>
            <template #subheader.netFee="{ dataIndex }">
                <tc-table-number-input v-model="netFeeAll" class="w-12" :decimal-places="1" />
            </template>
            <template #data.netFee="{ dataIndex }">
                <tc-table-number-input v-model="tableData[dataIndex].netFee" class="w-12" :decimal-places="1" />
            </template>
            <template #data.reofferYield="{ dataIndex }">
                <tc-table-immutable-number :value="tableData[dataIndex].reofferYield" :decimal-places="3" />
            </template>
            <template #data.coupon="{ dataIndex }">
                <tc-table-immutable-number :value="tableData[dataIndex].coupon" :decimal-places="3" />
            </template>
        </tc-table>
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
import TcDialog from "@/components/ui/dialog/TcDialog.vue";
import TcTooltip from "@/components/ui/tooltip/TcTooltip.vue";
import TcOriginationPricingHeaderLabel
    from "@/components/fixedincome/origination/pricing/TcOriginationPricingHeaderLabel.vue";

const tableHeaders = reactive({
    baseGroup: {
        label: "Base Parameters",
        headers: {
            tenor: "Tenor",
            msFixVsSaron: "MS fix vs SARON",
            reofferSpread: "Reoffer spread",
            reofferYield: "Reoffer yield",
            coupon: "Coupon",
            netFee: "Net fee"
        }
    },
    allInBondPricing: {
        label: "CHF All-in Bond Pricing",
        headers: {
            chfAllInYield: "CHF All-in yield p. a.",
            allInSpreadVsSaron: "All-in spread vs SARON CHF MS"
        }
    },
    aallInBondPricing: {
        label: "CHF All-in Bond Pricing",
        headers: {
            chfAllInYield: "CHF All-in yield p. a.",
            allInSpreadVsSaron: "All-in spread vs SARON CHF MS"
        }
    }
});

const tableData = reactive([
    { tenor: "2", msFixVsSaron: 12, reofferSpread: 1, netFee: 0, coupon: 1, reofferYield: 2, chfAllInYield: 4, allInSpreadVsSaron: 5 },
    { tenor: "3", msFixVsSaron: 12, reofferSpread: 1, netFee: 0, coupon: 1, reofferYield: 2, chfAllInYield: 4, allInSpreadVsSaron: 5 },
    { tenor: "4", msFixVsSaron: 12, reofferSpread: 1, netFee: 0, coupon: 1, reofferYield: 2, chfAllInYield: 4, allInSpreadVsSaron: 5 },
    { tenor: "5", msFixVsSaron: 12, reofferSpread: 1, netFee: 0, coupon: 1, reofferYield: 2, chfAllInYield: 4, allInSpreadVsSaron: 5 },
    { tenor: "6", msFixVsSaron: 12, reofferSpread: 1, netFee: 0, coupon: 1, reofferYield: 2, chfAllInYield: 4, allInSpreadVsSaron: 5 },
    { tenor: "7", msFixVsSaron: 12, reofferSpread: 1, netFee: 0, coupon: 1, reofferYield: 2, chfAllInYield: 4, allInSpreadVsSaron: 5 },
]);

const pricingDescription = ref("Senior preferred Suggestion 1");
const reofferSpreadAll = ref(0);
watch(reofferSpreadAll, val => tableData.forEach(entry => entry.reofferSpread += val));
const netFeeAll = ref(0);
watch(netFeeAll, val => tableData.forEach(entry => entry.netFee += val));
</script>
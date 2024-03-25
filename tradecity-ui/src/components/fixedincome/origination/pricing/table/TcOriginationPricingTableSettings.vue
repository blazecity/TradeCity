<template>
    <div class="min-w-fit bg-secondary rounded-sm">
        <tc-title-bar title="Pricing Parameters" icon="close" @icon-click="handleClose" />
        <tc-form :data="settingsFormData" class="px-1.5 pt-2 w-full">
            <template #collateral>
                <tc-combo-box selection="" placeholder="Collateral" :items="collateralList" class="w-full" editable dark />
            </template>
            <template #couponPayingAgentFee>
                <tc-number-input :decimal-places="1" v-model="couponPayingAgentFee" placeholder="Coupon paying agent fee" class="w-full" unit="bps" dark />
            </template>
            <template #paymentFrequency>
                <tc-combo-box selection="" placeholder="Payment Frequency" :items="{}" class="w-full" dark />
            </template>
            <template #redemptionFee>
                <tc-number-input :decimal-places="1" v-model="redemptionFee" placeholder="Redemption fee" class="w-full" unit="bps" dark />
            </template>
            <template #outOfPocketFee>
                <tc-number-input :decimal-places="0" v-model="outOfPocketFee" placeholder="Out of pocket fee" class="w-full" unit="CHF" dark />
            </template>
            <template #notes>
                <tc-string-input v-model="notes" placeholder="Notes" class="w-full" dark />
            </template>
        </tc-form>
    </div>
</template>


<script setup lang="ts">
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
import TcForm from "@/components/ui/form/TcForm.vue";
import {reactive} from "vue";
import TcComboBox from "@/components/ui/combobox/TcComboBox.vue";
import TcNumberInput from "@/components/ui/input/TcNumberInput.vue";
import TcTitleBar from "@/components/ui/common/TcTitleBar.vue";

type TcOriginationPricingTableSettingsEmits = {
    close: []
}
const emits = defineEmits<TcOriginationPricingTableSettingsEmits>();

const collateralList = {
    "sen_sec": { label: 'Senior secured', data: 1 },
    "sen_unsec": { label: "Senior unsecured", data: 2 },
    "jun_sec": { label: "Junior secured", data: 3 },
    "jun_unsec": { label: "Junior unsecured", data: 4 }
};

const collateral = defineModel<string>("collateral", { required: true });
const couponPayingAgentFee = defineModel<number>("couponPayingAgentFee", { required: true })
const paymentFrequency = defineModel<string>("paymentFrequency", { required: true })
const redemptionFee = defineModel<number>("redemptionFee", { required: true })
const outOfPocketFee = defineModel<number>("outOfPocketFee", { required: true })
const notes = defineModel<string>("notes", { required: true })

const settingsFormData = reactive({
    collateral: "Collateral",
    couponPayingAgentFee: "Coupon paying agent fee",
    paymentFrequency: "Payment frequency",
    redemptionFee: "Redemption fee",
    outOfPocketFee: "Out of pocket fee",
    notes: "Notes"
});

// ============ EVENT HANDLERS ============

function handleClose(): void {
    emits("close");
}
</script>

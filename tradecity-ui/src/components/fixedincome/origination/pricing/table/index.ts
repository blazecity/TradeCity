export type PricingSettingsData = {
    collateral: string,
    couponPayingAgentFee: number,
    paymentFrequency: string,
    redemptionFee: number,
    outOfPocketFee: number,
    tenors: Array<string>,
    notes: string
}
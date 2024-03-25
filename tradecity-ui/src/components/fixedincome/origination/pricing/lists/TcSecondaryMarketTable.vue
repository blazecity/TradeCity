<template>
  <tc-table :headers="tableHeaders" :data="data" description="Secondary Market Bonds">

  </tc-table>
</template>

<script setup lang="ts">
import TcTable from "@/components/ui/table/TcTable.vue";
import {reactive} from "vue";
import {faker} from "@faker-js/faker";
/*
-	Issuer
-	Collateral
-	Rating
-	Coupon
-	Announcement date
-	Maturity
-	Years to maturity
-	Years to first call
-	Currency
-	Size outstanding
-	Yield

* */
const tableHeaders = reactive({
  baseGroup: {
    label: "",
    headers: {
      issuer: "Issuer",
      collateral: "Collateral",
      rating: "Rating",
      coupon: "Cpn",
      announcementDate: "Announcement Date",
      maturity: "Maturity",
      yearsToMaturity: "Yrs to mat",
      yearsToFirstCall: "Yrs to fr call",
      currency: "Currency",
      size: "Size out",
      yield: "Yield",
    }
  }
});

type SecondaryMarketEntry = {
  issuer: string,
  collateral: string,
  rating: string,
  coupon: number,
  announcementDate: Date,
  maturity: Date,
  yearsToMaturity: number,
  yearsToFirstCall: number,
  currency: string,
  size: number,
  yield: number,
}

const data: Array<SecondaryMarketEntry> = [];
for (let i = 0; i < 10; i++) {
  data.push({
    issuer: faker.company.name(),
    collateral: "Senior preferred",
    rating: "A / A+ / Aa1",
    coupon: faker.number.float({ min: 0, max: 5, fractionDigits: 3 }),
    announcementDate: new Date(),
    maturity: new Date(),
    yearsToMaturity: 2.1,
    yearsToFirstCall: null,
    currency: "CHF",
    size: 100,
    yield: 10,
  })
}
</script>

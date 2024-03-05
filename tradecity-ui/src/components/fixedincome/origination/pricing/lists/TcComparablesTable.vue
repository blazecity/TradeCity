<template>
<tc-table :headers="tableHeaders" :data="data" description="Comparable Bonds">

</tc-table>
</template>

<script setup lang="ts">
import TcTable from "@/components/ui/table/TcTable.vue";
import {reactive} from "vue";
import {faker} from "@faker-js/faker";

const tableHeaders = reactive({
  baseGroup: {
    label: "",
    headers: {
      issuer: "Issuer",
      collateral: "Collateral",
      rating: "Rating",
      coupon: "Cpn",
      maturity: "Maturity",
      currency: "Currency",
      size: "Size out",
      yield: "Yield",
      zSpreadSaron: "Z-Spread SARON"
    }
  }
});

type Comparable = {
  issuer: string,
  collateral: string,
  rating: string,
  coupon: number,
  maturity: Date,
  currency: string,
  size: number,
  yield: number,
  zSpreadSaron: number
}

const data: Array<Comparable> = [];
for (let i = 0; i < 100; i++) {
  data.push({
    issuer: faker.company.name(),
    collateral: "Senior preferred",
    rating: "A / A+ / Aa1",
    coupon: faker.number.float({ min: 0, max: 5, fractionDigits: 3 }),
    maturity: new Date(),
    currency: "CHF",
    size: 100,
    yield: 10,
    zSpreadSaron: 7
  })
}
</script>

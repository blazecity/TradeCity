import { createRouter, createWebHistory } from "vue-router";
import {moduleTree} from "@/modules/index.gen";

const TcTemp = () => import("@/components/temp/TcTemp.vue");

console.log(moduleTree);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: moduleTree.fixedIncome.path,
      children: [
        {
          path: moduleTree.fixedIncome.functionalityGroups.origination.path,
          children: [
            {
              path: moduleTree.fixedIncome.functionalityGroups.origination.functionalities.pricing.path,
              components: {
                MainArea: TcTemp,
                ModuleContext: TcTemp
              },
              props: {
                MainArea: { text: "MainArea" },
                ModuleContext: { text: "ModuleContext" }
              }
            }
          ]
        }
      ]
    },
  ]
});

export default router;

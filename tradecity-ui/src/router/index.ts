import { createRouter, createWebHistory } from "vue-router";

const TcTemp = () => import("@/components/temp/TcTemp.vue");
const TcTemp2 = () => import("@/components/temp/TcTemp2.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      components: {
        MainArea: TcTemp,
        ModuleContext: TcTemp
      }
    },
    {
      path: "/temp",
      name: "Temp2",
      components: {
        MainArea: TcTemp2,
        ModuleContext: TcTemp2
      }
    }
  ]
});

export default router;

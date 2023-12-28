import { createRouter, createWebHistory } from "vue-router";
import {moduleTree} from "@/modules/index.gen";

// General
const TcDefaultHeaderContext = () => import("@/components/layout/header/TcDefaultHeaderContext.vue");

// Fixed Income - Origination
const TcOriginationContext = () => import("@/views/fixedincome/origination/TcOriginationContext.vue");
const TcOriginationPricing = () => import("@/views/fixedincome/origination/pricing/TcOriginationPricing.vue");
const TcOriginationComparablesManagement = () => import("@/views/fixedincome/origination/comparables/TcOriginationComparablesManagement.vue");

// Clients - Client Management
const TcAddClient = () => import("@/views/clients/clientmanagement/add/TcAddClient.vue");
const TcEditClient = () => import("@/views/clients/clientmanagement/edit/TcEditClient.vue");

// Developer - System
const TcSystemStatusOverview = () => import("@/views/dev/system/TcSystemStatusOverview.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home
    {
      path: moduleTree.home.path,
      name: moduleTree.home.navigationName,
      children: [

      ]
    },
    // Fixed Income
    {
      path: moduleTree.fixedIncome.path,
      name: moduleTree.fixedIncome.navigationName,
      children: [
        // Fixed Income - Origination
        {
          path: moduleTree.fixedIncome.functionalityGroups?.origination.path,
          children: [
            // Fixed Income - Origination - Pricing
            {
              path: moduleTree.fixedIncome.functionalityGroups.origination.functionalities.pricing.path,
              name: moduleTree.fixedIncome.functionalityGroups.origination.functionalities.pricing.navigationName,
              components: {
                MainArea: TcOriginationPricing,
                FunctionalityNameArea: TcDefaultHeaderContext
              },
              props: {
                FunctionalityNameArea: { text: moduleTree.fixedIncome.functionalityGroups.origination.functionalities.pricing.name }
              }
            },
              // Fixed Income - Origination - Comparables
            {
              path: moduleTree.fixedIncome.functionalityGroups.origination.functionalities.comparables.path,
              name: moduleTree.fixedIncome.functionalityGroups.origination.functionalities.comparables.navigationName,
              components: {
                MainArea: TcOriginationComparablesManagement,
                FunctionalityNameArea: TcDefaultHeaderContext
              },
              props: {
                FunctionalityNameArea: { text: moduleTree.fixedIncome.functionalityGroups.origination.functionalities.comparables.name }
              }
            }
          ]
        }
      ]
    },
    // Clients
    {
      path: moduleTree.clients.path,
      name: moduleTree.clients.navigationName,
      children: [
        // Clients - Client Management
        {
          path: moduleTree.clients.functionalityGroups.clientManagement.path,
          children: [
            // Clients - Client Management - Add Client
            {
              path: moduleTree.clients.functionalityGroups.clientManagement.functionalities.add.path,
              name: moduleTree.clients.functionalityGroups.clientManagement.functionalities.add.navigationName,
              components: {
                MainArea: TcAddClient,
                FunctionalityNameArea: TcDefaultHeaderContext
              },
              props: {
                FunctionalityNameArea: { text: moduleTree.clients.functionalityGroups.clientManagement.functionalities.add.name }
              }
            },
            // Clients - Client Management - Edit Client
            {
              path: moduleTree.clients.functionalityGroups.clientManagement.functionalities.edit.path,
              name: moduleTree.clients.functionalityGroups.clientManagement.functionalities.edit.navigationName,
              components: {
                MainArea: TcEditClient,
                FunctionalityNameArea: TcDefaultHeaderContext
              },
              props: {
                FunctionalityNameArea: { text: moduleTree.clients.functionalityGroups.clientManagement.functionalities.edit.name }
              }
            }
          ]
        }
      ]
    },
    // Developer
    {
      path: moduleTree.dev.path,
      name: moduleTree.dev.navigationName,
      children: [
        // Developer - System
        {
          path: moduleTree.dev.functionalityGroups.system.path,
          children: [
            // Developer - System - Status
            {
              path: moduleTree.dev.functionalityGroups.system.functionalities.status.path,
              name: moduleTree.dev.functionalityGroups.system.functionalities.status.navigationName,
              components: {
                MainArea: TcSystemStatusOverview,
                FunctionalityNameArea: TcDefaultHeaderContext
              },
              props: {
                FunctionalityNameArea: { text: moduleTree.dev.functionalityGroups.system.functionalities.status.name }
              }
            }
          ]
        }
      ]
    }
  ]
});

export default router;

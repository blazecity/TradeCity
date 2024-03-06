<template>
  <div class="outer-container h-full w-full">
    <div class="bg-main grid grid-cols-auto-fr inner-container-rows overflow-hidden">
      <tc-navigation class="row-span-full"></tc-navigation>
      <tc-header></tc-header>
      <tc-main></tc-main>
    </div>
    <tc-footer class="col-span-full">
      <template #left>
        <tc-system-version/>
      </template>
      <template #right>
        <tc-system-status/>
        <tc-connection-status/>
      </template>
    </tc-footer>
  </div>
</template>

<script setup lang="ts">
import {ClickType, useClickContext} from "@/stores/clickcontext";
import TcNavigation from "@/components/nav/TcNavigation.vue";
import TcMain from "@/components/layout/main/TcMain.vue";
import TcFooter from "@/components/layout/footer/TcFooter.vue";
import TcHeader from "@/components/layout/header/TcHeader.vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcSystemStatus from "@/components/dev/system/TcSystemStatusBadge.vue";
import TcConnectionStatus from "@/components/dev/system/TcConnectionStatus.vue";
import TcSystemVersion from "@/components/dev/system/TcSystemVersionBadge.vue";
import {provide} from "vue";
import {DefaultApolloClient} from "@vue/apollo-composable";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client/core";

const {registerClick} = useClickContext();

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    registerClick(ClickType.ESCAPE);
  }
});

document.addEventListener("mousedown", () => {
  registerClick(ClickType.OUTSIDE)
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "/graphql"
  })
});

provide(DefaultApolloClient, apolloClient);
</script>

<style scoped>
.outer-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}

.inner-container-rows {
  grid-template-rows: auto 1fr;
}
</style>
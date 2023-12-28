<template>
    <div class="layout-container h-full w-full">
        <tc-navigation class="row-span-2 flex" />
        <tc-header class="col-span-2">
            <tc-icon class="text-xl" icon="notifications" />
            <tc-icon class="text-xl" icon="help" />
        </tc-header>
        <tc-main class="col-span-2">
            Hello
        </tc-main>
        <tc-footer class="col-span-full">
            <template #left>
                <tc-system-version />
            </template>
            <template #right>
                <tc-system-status />
                <tc-connection-status />
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

const { registerClick } = useClickContext();

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
.layout-container {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-rows: auto 1fr auto;
}
</style>
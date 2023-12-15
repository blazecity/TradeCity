<template>
    <div class="layout-container h-full w-full">
        <tc-navigation class="row-span-2 flex" />
        <tc-header class="col-span-2">

        </tc-header>
        <tc-main class="col-span-2">
            Hello
        </tc-main>
        <tc-footer class="col-span-full">
            Hello
        </tc-footer>
    </div>
</template>

<script setup lang="ts">
import {ClickType, Context, useClickContext} from "@/stores/clickcontext";
import TcNavigation from "@/components/nav/TcNavigation.vue";
import TcMain from "@/components/layout/main/TcMain.vue";
import TcFooter from "@/components/layout/footer/TcFooter.vue";
import TcHeader from "@/components/layout/header/TcHeader.vue";

const { registerClick } = useClickContext();

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    registerClick(Context.BODY, ClickType.ESCAPE);
  }
});

document.addEventListener("mousedown", () => {
  registerClick(Context.BODY, ClickType.OUTSIDE)
});
</script>

<style scoped>
.layout-container {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-rows: auto 1fr auto;
}
</style>
<template>
    <div class="flex items-center" v-if="functionalitySelected">
        <div class="flex">
            <div class="crumb pl-1 rounded-l-sm">{{ moduleTree[module].name }}</div>
            <div class="arrow-right"></div>
        </div>
        <div class="flex -ml-4">
            <div class="crumb">
                <div class="arrow-left-inward"></div>
                <span>{{ moduleTree[module].functionalityGroups[functionalityGroup].name }}</span>
            </div>
            <div class="arrow-right"></div>
        </div>
        <div class="flex -ml-4">
            <div class="crumb rounded-r-sm pr-1">
                <div class="arrow-left-inward"></div>
                <span>{{ moduleTree[module].functionalityGroups[functionalityGroup].functionalities[functionality].name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {moduleTree} from "@/modules";
import {useNavigation} from "@/stores/navigation";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";

const navStore = useNavigation();
const { module, functionalityGroup, functionality, functionalitySelected } = storeToRefs(navStore);
const { selectFunctionality } = navStore;

const route = useRoute();
const routes = route.fullPath.split("/").filter(s => s !== "" && s !== "app");
const [modulePath, functionalityGroupPath, functionalityPath] = routes;
if (routes.length !== 0) selectFunctionality(modulePath, functionalityGroupPath, functionalityPath);
</script>

<style scoped>
.crumb {
    @apply flex bg-blue-300 items-center text-black font-bold relative;
}

.arrow-right {
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent transparent rgb(147 197 253);
    border-width: 0.6rem;
    z-index: 10;
}

.arrow-left-inward {
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent transparent var(--nav-secondary);
    border-width: 0.6rem;
}
</style>
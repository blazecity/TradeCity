<template>
<tc-main-view @click="outsideClick" />
</template>

<script setup lang="ts">
import TcMainView from './components/views/TcMainView.vue';
import { EventMessage } from './utils/eventbus';
import { useEventBus } from './utils/store';

//document.addEventListener("contextmenu", event => event.preventDefault());
const { booleanEventBus } = useEventBus();
window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        booleanEventBus.emit("escape_clicked", new EventMessage("", true))
    }
});
const outsideClick = () => booleanEventBus.emit("outside_clicked", new EventMessage("", true));

</script>

<style scoped>
</style>

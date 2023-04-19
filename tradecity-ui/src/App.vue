<template>
<tc-main-view />
</template>

<script setup lang="ts">
import TcMainView from './components/views/TcMainView.vue';
import { EventMessage } from './utils/eventbus';
import { useEventBus } from './utils/store';

//document.addEventListener("contextmenu", event => event.preventDefault());
const { booleanEventBus } = useEventBus();
window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        booleanEventBus.emit("escape_pressed", new EventMessage("", true))
    }
});
</script>

<style scoped>
</style>

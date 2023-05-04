<template>
<tc-main-view @click="outsideClick" />
</template>

<script setup lang="ts">
import TcMainView from './components/views/TcMainView.vue';
import { EventMessage, Topics } from './utils/eventbus';
import { useEventBus } from './utils/store';

document.addEventListener("contextmenu", event => {
    event.preventDefault();
    const context = (event.target as HTMLElement).dataset["context"];
    if (context != null && context !== "") console.log(context);
});
const { booleanEventBus } = useEventBus();
window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        booleanEventBus.emit(Topics.ESCAPE_CLICKED, new EventMessage("", true))
    }
});
const outsideClick = () => booleanEventBus.emit(Topics.OUTSIDE_CLICK, new EventMessage("", true));

</script>

<style scoped>
</style>

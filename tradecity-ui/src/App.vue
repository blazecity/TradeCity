<template>
<tc-main-view @click="outsideClick" />
<tc-context-menu />
</template>

<script setup lang="ts">
import TcMainView from './components/views/TcMainView.vue';
import TcContextMenu from './components/controls/contextmenu/TcContextMenu.vue';
import { EventMessage, Topics } from './utils/eventbus';
import { useEventBus } from './utils/store';

// TODO: Implement generic context menu functionality
// TODO: Implement context based header
const { booleanEventBus } = useEventBus();
window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        booleanEventBus.emit(Topics.ESCAPE_CLICKED, new EventMessage("", true));
    }
});
const outsideClick = () => booleanEventBus.emit(Topics.OUTSIDE_CLICK, new EventMessage("", true));
</script>

<style scoped>
</style>

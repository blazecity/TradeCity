<template>
<tc-main-view @click="outsideClick" />
<tc-context-menu />
</template>

<script setup lang="ts">
import TcMainView from './components/views/TcMainView.vue';
import TcContextMenu from './components/controls/contextmenu/TcContextMenu.vue';
import { EventMessage, Topics } from './utils/eventbus';
import { useEventBus } from './utils/store';

// TODO: Implement context based header
// TODO: Bookmarking favorites (requires main view for home menu)
// TODO: View change on functionality click (together with context based header)
// TODO: Align Table API with Context Menu API

const { booleanEventBus } = useEventBus();
window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        booleanEventBus.emit(Topics.ESCAPE_CLICKED, new EventMessage("", true));
    }
});
const outsideClick = () => booleanEventBus.emit(Topics.OUTSIDE_CLICK, new EventMessage("", true));
</script>
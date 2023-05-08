<template>
<div ref="contextmenu" class="flex-col hidden context-menu">
    <div v-if="currentConfig != null" v-for="group in Object.values(currentConfig.elements)">
        <div v-if="group.type === 'submenu'" class="relative group context-menu-item">
            <div class="flex justify-between">
                <span>{{ group.name }}</span>
                <east-icon styles="fill-white" :height="15" :width="15" />
            </div>
            <div class="absolute w-20 h-20 scale-0 group-hover:scale-100 bg-transparent pl-3 left-full -top-1.5">
                <div class="context-menu">
                    <div v-for="subelement in group.items" class="context-menu-item" @click="executeAndClose(subelement.callback)">{{ subelement.name }}</div>
                </div>
            </div>
        </div>
        <div v-if="group.type === 'single'">
            <hr class="border-neutral-600 my-1">
            <div v-for="subelement in group.items" class="context-menu-item" @click="executeAndClose(subelement.callback)">
                {{ subelement.name }}
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEventBus, useContextMenu } from '../../../utils/store';
import { Topics } from '../../../utils/eventbus';
import { TcContextMenuConfig } from './contextmenu';
import EastIcon from '../../icons/EastIcon.vue';
import { storeToRefs } from 'pinia';

const store = useContextMenu();
const { currentConfig } = storeToRefs(store);
const { setContextMenu } = store;

const contextmenu = ref<HTMLDivElement | undefined>();
const { booleanEventBus } = useEventBus();
booleanEventBus.subscribe(Topics.ESCAPE_CLICKED, close);
booleanEventBus.subscribe(Topics.OUTSIDE_CLICK, close);

document.addEventListener("contextmenu", event => {
    event.preventDefault();
    const context = (event.target as HTMLElement).dataset["context"];
    if (context == null || context === "") {
        currentConfig.value = null;
        return;
    }
    
    setContextMenu(context);

    if (contextmenu.value) {
        const menu = contextmenu.value;

        menu.style.display = "inline-flex";
        menu.style.left = event.pageX + "px";
        menu.style.top = event.pageY + "px";
    }
});

function executeAndClose(callback: () => void): void {
    callback();
    close();
}

function close(): void {
    if (contextmenu.value) {
        contextmenu.value.style.display = "none";
    }
}

</script>
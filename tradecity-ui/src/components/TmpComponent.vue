<template>
    <div>{{d}}, {{windowName}}
        <tc-button @click="close">Close</tc-button>
        <tc-button @click="sendMessage">Send Message</tc-button>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import {useBroadcastChannel} from "@/composables/window";

const d = ref("");
const windowName = window.name;

const channel = useBroadcastChannel<string>(window.name, msg => {
    d.value = msg.data;
}, console.log, console.log);

const close = () => window.close();
const sendMessage = () => channel.postMessage("Hello from TmpComponent")
</script>

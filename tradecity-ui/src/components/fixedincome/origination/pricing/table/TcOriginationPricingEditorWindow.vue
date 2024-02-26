<template>
  <tc-window title="Add Pricing" on-message="" #="{ channel, close }" >
      <tc-origination-pricing-editor @ok="onOk(channel, close)" @cancel="onCancel(channel, close)" />
  </tc-window>
</template>

<script setup lang="ts">
import TcWindow from "@/components/ui/window/TcWindow.vue";
import TcOriginationPricingEditor from "@/components/fixedincome/origination/pricing/table/TcOriginationPricingEditor.vue";
import type {TcBroadcastChannel} from "@/utilities/window";

// ========= EVENT HANDLERS =========
function onOk(channel: TcBroadcastChannel<string>, closeWindow: () => void): void {
    channel.postMessage("Clicked okay in pricing editor");
    closeWindow();
}

function onCancel(channel: TcBroadcastChannel<string>, closeWindow: () => void): void {
    channel.postMessage("Cancel in pricing editor");
    closeWindow();
}
</script>

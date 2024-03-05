<template>
  <div class="grid grid-rows-auto-fr h-full w-full bg-dark">
      <tc-title :title="title" />
      <slot :channel="channel" :close="closeWindow"></slot>
  </div>
</template>

<script setup lang="ts" generic="T">
import {useBroadcastChannel} from "@/composables/window";
import type {TcBroadcastChannelMessageCallback} from "@/utilities/window";
import TcTitleBar from "@/components/ui/common/TcTitleBar.vue";
import TcTitle from "@/components/ui/title/TcTitle.vue";

type TcWindowProps = {
    title: string,
    onMessage: TcBroadcastChannelMessageCallback<T>,
    onErrorMessage?: TcBroadcastChannelMessageCallback<T>,
    onClose?: () => void
}
const props = withDefaults(defineProps<TcWindowProps>(), {
    onErrorMessage: () => {},
    onClose: () => {},
});

const channel = useBroadcastChannel<string>(window.name, props.onMessage, props.onErrorMessage, () => {
    props.onClose();
    window.close();
});

function closeWindow(): void {
    window.close();
}
</script>

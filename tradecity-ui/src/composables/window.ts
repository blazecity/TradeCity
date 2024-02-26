import {TcBroadcastChannel} from "@/utilities/window";
import type {TcBroadcastChannelMessageCallback} from "@/utilities/window";
import {onBeforeUnmount, onUnmounted} from "vue";

export function useBroadcastChannel<T>(
    name: string,
    onMessage: TcBroadcastChannelMessageCallback<T>,
    onErrorMessage: TcBroadcastChannelMessageCallback<T>,
    onClose: () => void
) {
    const channel = new TcBroadcastChannel<T>(name, onMessage, onErrorMessage, onClose);

    window.onbeforeunload = () => channel.close();
    onBeforeUnmount(() => channel.close());

    return channel;
}

export function useBrowserWindow<T>(
    url: string,
    onMessage: TcBroadcastChannelMessageCallback<T>,
    onErrorMessage: TcBroadcastChannelMessageCallback<T> = () => {},
    onClose: () => void = () => {},
    height: number = 500,
    width: number = 1100
) {
    const channelRegistry = new Map<string, {
        channel: TcBroadcastChannel<T>,
        appWindow: Window
    }>();

    const openNewWindow = () => {
        const channelId = crypto.randomUUID();
        const appWindow = window.open(url, channelId, `height=${height},width=${width}`);
        if (!appWindow) return null;
        const channel = new TcBroadcastChannel<T>(channelId, onMessage, onErrorMessage, onClose);
        const registryEntry = {
            channel,
            appWindow
        };

        channelRegistry.set(channelId, registryEntry);
        return registryEntry;
    };

    onUnmounted(() => channelRegistry.forEach(entry => {
        entry.channel.close();
        entry.appWindow.close();
    }));

    return openNewWindow;
}
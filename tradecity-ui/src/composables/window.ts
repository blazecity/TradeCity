import {TcBroadcastChannel} from "@/utilities/window";
import type {TcBroadcastChannelMessageCallback} from "@/utilities/window";
import {onBeforeUnmount, onUnmounted} from "vue";
import type {Option} from "@/utilities/functional";
import {None, Some} from "@/utilities/functional";

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

type ChannelWindowPair<T> = {
    channel: TcBroadcastChannel<T>,
    appWindow: Window
}

export function useBrowserWindow<T>(
    url: string,
    onMessage: TcBroadcastChannelMessageCallback<T>,
    onErrorMessage: TcBroadcastChannelMessageCallback<T> = () => {},
    onClose: () => void = () => {},
    height: number = 500,
    width: number = 1100
) {
    const channelRegistry = new Map<string, ChannelWindowPair<T>>();

    const openNewWindow = (): Option<ChannelWindowPair<T>> => {
        const channelId = crypto.randomUUID();
        const appWindow = window.open(url, channelId, `height=${height},width=${width}`);
        if (!appWindow) return None();
        const channel = new TcBroadcastChannel<T>(channelId, onMessage, onErrorMessage, onClose);
        const registryEntry = {
            channel,
            appWindow
        };

        channelRegistry.set(channelId, registryEntry);
        return Some(registryEntry);
    };

    onUnmounted(() => channelRegistry.forEach(entry => {
        entry.channel.close();
        entry.appWindow.close();
    }));

    return openNewWindow;
}
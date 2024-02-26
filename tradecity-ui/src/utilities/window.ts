export const closingMessage = "channel_final_message";
export type ClosingMessage = typeof closingMessage;
export type TcBroadcastChannelMessageCallback<T> = (message: MessageEvent<T | ClosingMessage>) => void;

export class TcBroadcastChannel<T> {
    private readonly _broadcastChannel: BroadcastChannel;
    private readonly _onClose: () => void;

    constructor(
        channelName: string,
        onMessage: TcBroadcastChannelMessageCallback<T>,
        onMessageError: TcBroadcastChannelMessageCallback<T>,
        onClose: () => void
    ) {
        this._broadcastChannel = new BroadcastChannel(channelName);
        this.onMessage = onMessage;
        this.onMessageError = onMessageError;
        this._onClose = onClose;
    }

    public postMessage(message: T | ClosingMessage): void {
        this._broadcastChannel.postMessage(message);
    }

    public set onMessage(callback: TcBroadcastChannelMessageCallback<T>) {
        this._broadcastChannel.onmessage = msg => {
            if (msg.data === closingMessage) {
                this._onClose();
                return;
            }
            callback(msg);
        };
    }

    public set onMessageError(callback: TcBroadcastChannelMessageCallback<T>) {
        this._broadcastChannel.onmessageerror = callback;
    }

    public close(): void {
        this._broadcastChannel.postMessage(closingMessage);
        this._broadcastChannel.close();
    }
}

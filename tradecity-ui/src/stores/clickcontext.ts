import {defineStore} from "pinia";
import {onBeforeUnmount, onMounted, reactive} from "vue";
import type {PositiveInteger} from "@/utilities/numbers";

export enum ClickType {
    OUTSIDE,
    ESCAPE
}

export type ClickContext = {
    clickToggle: boolean;
    clickType: ClickType;
}

type HandlerFn = () => boolean;
type Handler = {
    id: string;
    level: number;
    handlerFn: HandlerFn;
    guard: boolean;
};

export const useClickContext = defineStore("clickcontext", () =>{
    const clickContext: ClickContext = reactive({
        clickToggle: true,
        clickType: ClickType.ESCAPE
    });

    const handlerMap = new Map<string, Handler>();
    const handlerQueue = new Array<Array<Handler>>();

    const removeFromHandlerQueue = (id: string) => {
        if (handlerMap.has(id)) {
            const currentLevel = handlerMap.get(id)!.level
            const handlerQueueLevel = handlerQueue[currentLevel];
            if (handlerQueueLevel) {
                const index = handlerQueueLevel.findIndex(element => element.id === id);
                if (index > -1) {
                    handlerQueueLevel.splice(index, 1);
                }
            }
        }
    }

    const registerHandler = <N extends number>(id: string, level: PositiveInteger<N>, handlerFn: HandlerFn) => {
        const guardElement = () => {
            const h = handlerMap.get(id);
            if (h) {
                h.guard = true;
            }
        };

        onMounted(() => {
            document.getElementById(id)?.addEventListener("mousedown", guardElement);
            removeFromHandlerQueue(id);

            const handler: Handler = {
                id,
                level,
                handlerFn,
                guard: false
            };

            handlerMap.set(id, handler);

            const handlerList = handlerQueue[level];
            if (handlerList) {
                handlerList.push(handler)
            } else {
                handlerQueue[level] = [handler];
            }
        });

        onBeforeUnmount(() => {
            document.getElementById(id)?.removeEventListener("mousedown", guardElement);
            handlerMap.delete(id);
        });
    }

    const registerClick = (clickType: ClickType) => {
        clickContext.clickToggle = !clickContext.clickToggle;
        clickContext.clickType = clickType;

        for (let i = handlerQueue.length - 1; i >= 0; i--) {
            let didConsumeEvent = false;
            const handlerList = handlerQueue[i];
            if (!handlerList) continue;

            for (const handler of handlerList) {

                if (handler.guard) handler.guard = false
                else if (handler.handlerFn()) didConsumeEvent = true;
            }
            if (didConsumeEvent) break;
        }
        for (const handlerList of handlerQueue) {

        }
    };

    return { registerHandler, registerClick };
});
import {defineStore} from "pinia";
import {onBeforeUnmount, onMounted, onUnmounted, reactive, watch} from "vue";

export enum Context {
    BODY,
    MODAL
}

export enum ClickType {
    OUTSIDE,
    ESCAPE
}

export type ClickContext = {
    clickToggle: boolean;
    context: Context;
    clickType: ClickType;
}

type HandlerFn = () => void;
type Handler = {
    id: string;
    handlers: Map<Context, HandlerFn>;
    guard: boolean;
};

export const useClickContext = defineStore("clickcontext", () =>{
    const clickContext: ClickContext = reactive({
        clickToggle: true,
        context: Context.BODY,
        clickType: ClickType.ESCAPE
    });

    const handlerMap = new Map<string, Handler>();

    const registerHandler = (id: string, context: Context, handlerFn: () => void) => {
        const guardElement = () => {
            const h = handlerMap.get(id);
            if (h) {
                h.guard = true;
            }
        };

        onMounted(() => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener("mousedown", guardElement);
            }

            if (handlerMap.has(id)) {
                handlerMap.get(id)?.handlers.set(context, handlerFn);
            } else {
                handlerMap.set(id, {
                    id,
                    handlers: new Map([[context, handlerFn]]),
                    guard: false
                });
            }
        });

        onBeforeUnmount(() => {
            const element = document.getElementById(id);
            if (element) {
                element.removeEventListener("mousedown", guardElement);
            }

            handlerMap.delete(id);
        });
    }

    const registerClick = (context: Context, clickType: ClickType) => {
        clickContext.context = context;
        clickContext.clickToggle = !clickContext.clickToggle;
        clickContext.clickType = clickType;

        handlerMap.forEach(handler => {
            if (handler.guard) {
                handler.guard = false;
            } else {
                handler.handlers.get(context)?.();
            }
        })
    };

    return { registerHandler, registerClick };
});
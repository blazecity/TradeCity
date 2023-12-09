import type {VNode} from "vue";
import {computed, useSlots} from "vue";

type ProcessorFn<T> = (vNode: VNode) => T | undefined;

/**
 * Composable function for transforming children of a slot into an array of Type `T`.
 *
 * @param processor Callback function which processes the child node of a slot. If it returns `undefined`,
 *                  it will be ignored.
 * @param name Slot name
 */
export function useSlotProcessing<T>(processor: ProcessorFn<T>, name?: string) {
    const slots = useSlots();
    const slotName = name ?? "default";

    return computed(() => {
        const slot = slots[slotName];
        if (!slot) return [];

        return slot().reduce((array: Array<T>, child) => {
            const processingResult = processor(child);
            if (processingResult) {
                array.push(processingResult);
            }

            return array;
        }, []);
    });
}
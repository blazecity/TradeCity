import { defineStore } from 'pinia';
import { EventBus } from './eventbus';
import { ref } from 'vue';

export const useStringEventBus = defineStore("stringEventBus", () => {
    const eventBus = ref(new EventBus<string>());
    return { eventBus };
});

export const useBooleanEventBus = defineStore("booleanEventBus", () => {
    const eventBus = ref(new EventBus<boolean>());
    return { eventBus };
});

export const useNumberEventBus = defineStore("numberEventBus", () => {
    const eventBus = ref(new EventBus<number>());
    return { eventBus };
});
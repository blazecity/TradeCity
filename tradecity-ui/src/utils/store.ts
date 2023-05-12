import { defineStore } from 'pinia';
import { EventBus } from './eventbus';
import { reactive, ref, shallowRef } from 'vue';
import { Module, ModuleFunctionalityGroup, ModuleTree, SearchResultDocument } from '../components/nav/modules';
import { ModuleFunctionality } from '../components/nav/modules';
import HubIcon from '../components/icons/HubIcon.vue';
import DatabaseIcon from '../components/icons/DatabaseIcon.vue';
import CodeIcon from '../components/icons/CodeIcon.vue';
import { Orama, Results, create, insert, search, stemmers } from '@orama/orama';
import { BroadcastChannel } from 'broadcast-channel';
import { TcContextMenuConfig } from '../components/controls/contextmenu/contextmenu';
import { applicationName } from './constants';
import SwapIcon from '../components/icons/SwapIcon.vue';

export const useContextMenu = defineStore("contextmenu", () => {
    const store = new Map<string, TcContextMenuConfig>();
    const currentConfig = ref<TcContextMenuConfig | null>();

    const registerContextMenu = (config: TcContextMenuConfig) => store.set(config.id, config);
    const setContextMenu = (id: string) => currentConfig.value = store.get(id);

    return { registerContextMenu, setContextMenu, currentConfig };
});

/**
 * Custom hook for using a global broadcast channel.
 * 
 * Usage:
 * 
 * const store = useBroadcastChannel();
 * const { value } = storeToRefs(store); --> for maintaining reactivity
 * const { setValue } = store;
 */
export const useBroadcastChannel = defineStore("broadcast", () => {
    const value = ref("init");
    const broadcaster = new BroadcastChannel<string>("broadcast");
    const receiver = new BroadcastChannel<string>("broadcast");
    const setValue = (newValue: string) => broadcaster.postMessage(newValue);
    receiver.onmessage = message => value.value = message;
    return { value, setValue };
});

export const useEventBus = defineStore("eventBus", () => {
    const stringEventBus = ref(new EventBus<string>());
    const booleanEventBus = ref(new EventBus<boolean>());
    const numberEventBus = ref(new EventBus<number>());
    return { stringEventBus, booleanEventBus, numberEventBus };
});

export const useModuleIndex = defineStore("moduleIndex", () => {
    const specialModules: ModuleTree = {
        home: {
            name: applicationName,
            iconComponent: shallowRef(SwapIcon),
            tags: ["tc"],
            groups: {}
        }
    }

    const mods: ModuleTree = {
        bond: {
            name: "Bonds",
            iconComponent: shallowRef(HubIcon),
            tags: ["bd"],
            groups: {
                origination: {
                    name: "Origination",
                    functionalities: {
                        dashboard: { name: "Dashboard", description: "Origination Dashboard", tags: [], view: shallowRef(), isBookmarked: false },
                        pricing: { name: "Pricing", description: "Pricing Table", tags: [], view: shallowRef(), isBookmarked: false },
                        presentation: { name: "Presentation Editor", description: "Presentation Editor", tags: [], view: shallowRef(), isBookmarked: false }
                    }
                }
            }
        },
        marketdata: {
            name: "Market Data",
            iconComponent: shallowRef(DatabaseIcon),
            tags: ["md"],
            groups: {
                general: {
                    name: "General",
                    functionalities: {

                    }
                }
            }
        },
        dev: {
            name: "Developer",
            iconComponent: shallowRef(CodeIcon),
            tags: [],
            groups: {

            }
        }
    }

    const db = ref<Orama>()
    const searchResults = ref<Results>();

    const dbSetup = async () => {
        const index = await create({
            schema: {
                functionality: "string",
                tags: "string",
                module: "string",
                group: "string",
                description : "string",
                moduleIndex: "number",
                moduleId: "string",
                groupIndex: "number",
                groupId: "string",
                funcIndex: "number",
                funcId: "string"
            },
            components: {
                tokenizer: {
                    stemmer: stemmers.english
                }
            }
        });
    
        for (const [modKey, module] of Object.entries(mods)) {
            for (const [groupKey, functionalityGroup] of Object.entries(module.groups)) {
                for (const [funcKey, functionality] of Object.entries(functionalityGroup.functionalities)) {
                    await insert(index, {
                        functionality: functionality.name,
                        tags : functionality.tags.join(" "),
                        module: module.name,
                        group: functionalityGroup.name,
                        description: functionality.description,
                        moduleId: modKey,
                        groupId: groupKey,
                        funcId: funcKey
                    });
                }
            }
        }

        db.value = index;
    }

    dbSetup();
    const modules = reactive(mods);
    const selectedModule = ref<[string, Module]>(["home", specialModules["home"]]);
    const selectedFunctionality = ref<[string, ModuleFunctionality]>();

    const searchFor = (term: string, resultCallback: (results: Array<SearchResultDocument>) => void) => {
        if (!db.value) return;
        search(db.value, {
            term: term,
            properties: "*"
        }).then(results => resultCallback(results.hits.map(result => result.document as unknown as SearchResultDocument)));
    }

    return { 
        specialModules, 
        selectedModule, 
        selectedFunctionality, 
        modules, 
        searchResults, 
        searchFor 
    };
});
import { defineStore } from 'pinia';
import { EventBus } from './eventbus';
import { ref, shallowRef } from 'vue';
import { Module, ModuleFunctionalityGroup, SearchResultDocument } from './modules';
import { ModuleFunctionality } from './modules';
import HubIcon from '../components/icons/HubIcon.vue';
import DatabaseIcon from '../components/icons/DatabaseIcon.vue';
import CodeIcon from '../components/icons/CodeIcon.vue';
import { List, Set } from 'immutable';
import { Orama, Results, create, insert, search, stemmers } from '@orama/orama';
import { BroadcastChannel } from 'broadcast-channel';

// TODO: This is just for demonstrating purposes, but has to be programmed out in a more generic way.
export const useBroadcastChannel = defineStore("sharedState", () => {
    const value = ref("");
    const broadcaster = new BroadcastChannel<string>("sharedState");
    const receiver = new BroadcastChannel<string>("sharedState");
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
    const mods = List([
        new Module("bond", "Bonds", shallowRef(HubIcon), Set(["bd"]), List([
            new ModuleFunctionalityGroup("bond_general", "General", List([
                new ModuleFunctionality("bond_general_1", "Func Bond", "bond function", Set([])),
                new ModuleFunctionality("bond_general_2", "Func Bond 1", "bond function 1", Set([])),
                new ModuleFunctionality("bond_general_3", "Func Bond 2", "bond function 2", Set([]))
            ]))
        ])),
        new Module("marketdata", "Marketdata", shallowRef(DatabaseIcon), Set(["md"]), List([
            new ModuleFunctionalityGroup("marketdata_general", "General", List([
                new ModuleFunctionality("marketdata_general_1", "Func Marketdata", "marketdata function", Set([])),
                new ModuleFunctionality("marketdata_general_2", "Func Marketdata 1", "marketdata function 1", Set([]))
            ]))
        ])),
        new Module("dev", "Developer", shallowRef(CodeIcon), Set(), List([
            new ModuleFunctionalityGroup("dev_general", "General", List([
                new ModuleFunctionality("dev_general_1", "Func Dev", "dev function", Set([])),
                new ModuleFunctionality("dev_general_2", "Func Dev 1", "dev function 1", Set([]))
            ]))
        ]))
    ]);

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
    
        for (const [modIndex, module] of mods.entries()) {
            for (const [groupIndex, functionalityGroup] of module.functionalities.entries()) {
                for (const [funcIndex, functionality] of functionalityGroup.functionalities.entries()) {
                    await insert(index, {
                        functionality: functionality.name,
                        tags : functionality.tags.join(" "),
                        module: module.name,
                        group: functionalityGroup.name,
                        description: functionality.description,
                        moduleIndex: modIndex,
                        moduleId: module.id,
                        groupIndex: groupIndex,
                        groupId: functionalityGroup.id,
                        funcIndex: funcIndex,
                        funcId: functionality.id
                    });
                }
            }
        }

        db.value = index;
    }

    dbSetup();
    const modules = ref(mods);
    const searchFor = (term: string, resultCallback: (results: List<SearchResultDocument>) => void) => {
        if (!db.value) return;
        search(db.value, {
            term: term,
            properties: "*"
        }).then(results => resultCallback(List(results.hits.map(result => result.document as unknown as SearchResultDocument))));
    }

    return { modules, searchResults, searchFor };
});
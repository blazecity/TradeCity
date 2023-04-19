import { Component } from "vue";
import { List, Set } from "immutable";

export class Module {
    constructor(
        public readonly id: string,
        public readonly name: string, 
        public readonly iconComponent: Component, 
        public readonly tags: Set<string>,
        public readonly functionalities: List<ModuleFunctionalityGroup>
    ) {}
}

export class ModuleFunctionalityGroup {
    constructor(public readonly id: string, public readonly name: string, public readonly functionalities: List<ModuleFunctionality>) {}
}

export class ModuleFunctionality {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly tags: Set<string>,
    ) {}
}

export interface SearchResultDocument {
    functionality: string,
    tags: string,
    module: string,
    group: string,
    description : string,
    moduleIndex: number,
    moduleId: string,
    groupIndex: number,
    groupId: string,
    funcIndex: number,
    funcId: string
}

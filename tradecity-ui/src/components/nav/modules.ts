import { Component } from "vue";

export class Module {
    constructor(
        public readonly id: string,
        public readonly name: string, 
        public readonly iconComponent: Component, 
        public readonly tags: Array<string>,
        public readonly functionalities: Array<ModuleFunctionalityGroup>
    ) {}
}

export class ModuleFunctionalityGroup {
    constructor(public readonly id: string, public readonly name: string, public readonly functionalities: Array<ModuleFunctionality>) {}
}

export class ModuleFunctionality {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly tags: Array<string>,
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

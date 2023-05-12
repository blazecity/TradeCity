import { Component } from "vue";

export type ModuleTree = {
    [key: string]: Module
}

export type ModuleFunctionality = {
    name: string,
    description: string,
    tags: Array<string>,
    view: Component,
    isBookmarked: boolean
}

export type ModuleFunctionalityGroup = {
    name: string,
    functionalities: {
        [funcKey: string]: ModuleFunctionality
    }
    
}

export type Module = {
    name: string,
    iconComponent: Component,
    tags: Array<string>,
    groups: {
        [groupKey: string]: ModuleFunctionalityGroup
    }
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

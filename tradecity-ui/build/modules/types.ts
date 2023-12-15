export type ModuleTree = {
    [key: string]: {
        functionalityGroups: FunctionalityGroups
    };
};

export type FunctionalityGroups = {
    [functionalityGroupKey: string]: Functionalities;
};

export type Functionalities = {
    [functionalityKey: string]: {};
};

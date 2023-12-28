export type ModuleSchema = {
    [moduleKey: string]: {
        name: string;
        navigationName: string;
        path: string;
        icon: string;
        functionalityGroups: {
            [funcGroupKey: string]: {
                name: string;
                path: string;
                functionalities: {
                    [funcKey: string]: {
                        name: string;
                        navigationName: string;
                        path: string;
                        chunk: string;
                    }
                };
            };
        };
    };
};


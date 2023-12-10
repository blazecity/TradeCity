export type TableHeaders<T> = {
    [field in keyof T]?: string;
};

export type TableHeaderGroup<T> = {
    label?: string;
    headers: TableHeaders<T>;
};

export type TableHeaderGroups<T> = {
    [group: string]: TableHeaderGroup<T>;
};

export type TableData<T> = {
    isSelected: boolean;
    data: T;
}
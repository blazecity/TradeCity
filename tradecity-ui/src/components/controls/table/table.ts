import { List } from "immutable";
import { TableData } from "../../../utils/types";

export interface ColumnOptions {
    name: string,
    mutable?: boolean,
    decimalPoints?: number, 
    width?: string,
    group?: string,
    withTime?: boolean
}

export class TcTableConfig<T extends TableData, U extends { [key in keyof T]: ColumnOptions }> {
    static defaultColumnOptions: ColumnOptions = {
        name: "",
        mutable: false,
        decimalPoints: 0,
        width: "",
        group: "",
        withTime: false
    };

    constructor(
        public id: string,
        public label: string,
        public data: List<T>,
        public options: U 
    ) {
    }

    public option(column: keyof T): ColumnOptions {
        if (!this.options) return TcTableConfig.defaultColumnOptions;
        const options = this.options[column];
        if (options) return options;
        return TcTableConfig.defaultColumnOptions;
    }
}

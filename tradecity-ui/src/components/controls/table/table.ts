import { List } from "immutable";
import { TableData, TableInputType } from "../../../utils/types";

export interface ColumnOptions {
    name: string,
    mutable?: boolean,
    decimalPoints?: number, 
    width?: string,
    group?: string,
    withTime?: boolean
}

export class TcTableConfig<T extends TableData, U extends { [key in keyof T]: ColumnOptions }> {
    private _numColumns: number;

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
        this._numColumns = Object.keys(options).length;
    }

    public get numColumns(): number {
        return this._numColumns;
    }

    public get cells(): List<TableInputType> {
        return this.data.flatMap(dataPoint => Object.values(dataPoint));
    }
}

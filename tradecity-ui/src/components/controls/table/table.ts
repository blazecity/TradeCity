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
    public readonly originalData: Array<T>;
    public currentSorting: number = 0;
    public currentSortedField: string | keyof T = "";

    static defaultColumnOptions: ColumnOptions = {
        name: "",
        mutable: false,
        decimalPoints: 0,
        width: "",
        group: "",
        withTime: false,
    };

    constructor(
        public id: string,
        public label: string,
        public data: Array<T>,
        public options: U,
        public onValueChanged: (dataObject: T) => void = () => {}
    ) {
        this.originalData = [...data];
    }

    public get numColumns(): number {
        return Object.keys(this.options).length;
    }

    public get cells(): Array<TableInputType> {
        return this.data.flatMap(dataPoint => Object.values(dataPoint));
    }

    public resetOrder(): void {
        this.data = [...this.originalData];
    }

    public sortNext(key: keyof T): void {
        if (key === this.currentSortedField) {
            switch (this.currentSorting) {
                case 0: 
                    this.currentSorting = 1;
                    break;
                case 1: 
                    this.currentSorting = -1;
                    break;
                default: 
                    this.currentSorting = 0;
            }
        } else {
            this.currentSortedField = key;
            this.currentSorting = 1;
        }

        if (this.currentSorting === 0) {
            this.resetOrder();
            return;
        }
        this.data.sort((previous, current) => previous[this.currentSortedField] >= current[this.currentSortedField] ? (this.currentSorting * 1) : (this.currentSorting * -1));
    }
}

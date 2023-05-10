import { TableData, TableInputType } from "../../../utils/types";


export interface ColumnOptions {
    name: string,
    mutable?: boolean,
    decimalPoints?: number, 
    width?: string,
    withTime?: boolean
}

interface TableColumnOptions<T extends TableData> {
    [key: string]: {
        isGrouped: boolean,
        name: string,
        elements: { [key in keyof T]? : ColumnOptions }
    }
}

export class TcTableConfig<T extends TableData> {
    public readonly originalData: Array<T>;
    public currentSorting: number = 0;
    public currentSortedField: number = -1;
    public readonly grouped: boolean;

    static defaultColumnOptions: ColumnOptions = {
        name: "No name",
        mutable: false,
        decimalPoints: 0,
        width: "",
        withTime: false,
    };

    constructor(
        public id: string,
        public label: string,
        public data: Array<T>,
        public options: TableColumnOptions<T>,
        public onValueChanged: (dataObject: T) => void = () => {},
    ) {
        this.originalData = [...data];
        this.grouped = Object.values(this.options).find(option => option.isGrouped) ? true : false;
    }

    public resetOrder(): void {
        this.data = [...this.originalData];
    }

    public get flatColumnOptions(): Array<[string, ColumnOptions]> {
        const arr: Array<[string, ColumnOptions]> = [];
        for (const [groupKey, groupConfig] of Object.entries(this.options)) {
            for (const [columnKey, element] of Object.entries(groupConfig.elements)) {
                if (element) arr.push([columnKey, element]);
            }
        }
        return arr;
    }

    public sortNext(index: number): void {
        if (index === this.currentSortedField) {
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
            this.currentSortedField = index;
            this.currentSorting = 1;
        }

        if (this.currentSorting === 0) {
            this.resetOrder();
            return;
        }
        this.data.sort((previous, current) => Object.values(previous)[this.currentSortedField] >= Object.values(current)[this.currentSortedField] ? (this.currentSorting * 1) : (this.currentSorting * -1));
    }
}

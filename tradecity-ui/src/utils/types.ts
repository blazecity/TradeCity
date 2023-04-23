export type InputType = "string" | "number";
export type DateTime = Date;
export type TableInputType = string | number | boolean | Date;
export type TableData = {
    [key: string]: TableInputType
}
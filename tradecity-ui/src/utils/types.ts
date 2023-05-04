export type InputType = "string" | "number";
export type Styles = string | Array<string>
export type DateTime = Date;
export type TableInputType = string | number | boolean | Date;
export type TableData = {
    [key: string]: TableInputType
}
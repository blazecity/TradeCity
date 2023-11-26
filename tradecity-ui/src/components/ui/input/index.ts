import {Input} from "postcss";

export type ValidationResult = {
    isValid: boolean;
    errorMessage: string;
}

export enum NextOperation {
    FORMAT,
    SET_RAW,
    NO_OP
}

export type InputType = number | string | Date | boolean;
export type TargetType = number | string | Date | boolean;

export type SanitizingResult<T extends TargetType, V extends InputType> = {
    nextOperation: NextOperation;
    value: T;
    rawValue: V;
}

export type ValidationFn<T extends TargetType> = (input: T) => ValidationResult;
export type SanitizeFn<T extends TargetType, V extends  InputType> = (input: string) => SanitizingResult<T, V>;
export type FormatFn<T extends TargetType, V extends InputType> = (input: T) => V;

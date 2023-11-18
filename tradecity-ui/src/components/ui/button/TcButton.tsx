import {classes} from "../tools";
import {JSX, splitProps} from "solid-js";

interface TcButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    dangerous?: boolean;
    disabled?: boolean;
}

export default function TcButton(props: TcButtonProps) {
    const [local, buttonProps] = splitProps(props, ["text", "dangerous", "disabled", "class"]);

    return (
        <button
            {...buttonProps}
            class={classes("text-base m-1 py-0.5 px-2 rounded-sm hover:bg-dark-base", local.dangerous ? "bg-red-500" : "bg-base")}
            disabled={local.disabled}
        >
            { local.text }
        </button>
    )
}
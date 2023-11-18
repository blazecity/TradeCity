import {JSX, splitProps} from "solid-js";
import {classes} from "../tools";

interface TcBadgeProps extends JSX.HTMLAttributes<HTMLDivElement> {
    text: string;
}

export default function TcBadge(props: TcBadgeProps) {
    const [local, divProps] = splitProps(props, ['text']);

    return (
        <div {...divProps} class={classes(divProps.class, "text-base inline p-0.5 rounded-sm")}>{ local.text }</div>
    )
}
import {JSX, splitProps} from "solid-js";

interface TcBadgeProps extends JSX.HTMLAttributes<HTMLDivElement> {
    text: string;
}

export default function TcBadge(props: TcBadgeProps) {
    const [local, divProps] = splitProps(props, ['text']);

    return (
        <div {...divProps} class={divProps.class + " text-xs inline p-1 rounded-sm"}>{ local.text }</div>
    )
}
interface TcTitleProps {
    text: string;
}

export default function TcTitle(props: TcTitleProps) {
    return (
        <h1 class="m-1 text-xl">{ props.text }</h1>
    )
}
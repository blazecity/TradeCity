
interface TcSubtitleProps {
    text: string;
}

export default function TcSubtitle(props: TcSubtitleProps) {
    return (
        <h2 class="m-1">{props.text}</h2>
    )
}
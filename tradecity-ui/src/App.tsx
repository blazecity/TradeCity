import TcBadge from "./components/ui/badge/TcBadge.tsx";
import TcTitle from "./components/ui/typography/TcTitle.tsx";
import {createSignal} from "solid-js";
import TcSubtitle from "./components/ui/typography/TcSubtitle.tsx";

function App() {
    const [title, setTitle] = createSignal("Title 1");

    setTimeout(() => setTitle("Title 2"), 5000);

    return (
    <>
        <TcTitle text={title()} />
        <TcSubtitle text={title()} />
        <TcBadge text="Example" class="bg-yellow-300 text-black" />
    </>
    )
}

export default App;

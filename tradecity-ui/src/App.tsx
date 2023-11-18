import TcBadge from "./components/ui/badge/TcBadge.tsx";
import TcTitle from "./components/ui/typography/TcTitle.tsx";
import {createSignal} from "solid-js";
import TcSubtitle from "./components/ui/typography/TcSubtitle.tsx";
import TcButton from "./components/ui/button/TcButton.tsx";

function App() {
    const [title, setTitle] = createSignal("Title 1");
    const [dangerous, setDangerous] = createSignal(false);

    setTimeout(() => {
        setTitle("Title 2");
        setDangerous(true);
    }, 2000);

    return (
    <>
        <TcTitle text={title()} />
        <TcSubtitle text={title()} />
        <TcBadge text="Example" class="bg-yellow-300 text-black" />
        <TcButton text="Click Me" dangerous={dangerous()} onClick={() => setTitle("Hello")} />
    </>
    )
}

export default App;

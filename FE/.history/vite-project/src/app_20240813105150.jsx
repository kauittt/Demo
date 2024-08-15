import { useState } from "preact/hooks";
import "./app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export function App() {
    const [count, setCount] = useState(0);

    return (
        <h1 className="text-3xl font-bold underline">
            Hello world! <FontAwesomeIcon icon={faCoffee} />
        </h1>
    );
}

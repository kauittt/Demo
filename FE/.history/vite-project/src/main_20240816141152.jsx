import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);

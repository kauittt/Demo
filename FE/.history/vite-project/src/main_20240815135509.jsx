import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/Store/store.jsx";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>

    // </React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
);

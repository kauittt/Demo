import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/Store/store.jsx";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

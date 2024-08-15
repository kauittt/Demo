import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store"; // Make sure the path to your store file is correct
import App from "./App"; // Ensure this path is correct

ReactDOM.render(
    <React.StrictMode>
        <App />
        {/* <Provider store={store}> */}
        {/* </Provider> */}
    </React.StrictMode>,
    document.getElementById("root")
);

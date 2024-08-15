import React from "react";
import ReactDOM from "react-dom";
import App from "./app"; // Ensure this path is correct

ReactDOM.render(
    <React.StrictMode>
        <App />
        {/* <Provider store={store}> */}
        {/* </Provider> */}
    </React.StrictMode>,
    document.getElementById("root")
);

import { render } from "preact";
import { App } from "./app.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import "./i18n";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Suspense fallback="loading...">
            <Provider store={store}>
                <App />
            </Provider>
            ,
        </Suspense>
    </StrictMode>
);

// render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById("app")
// );

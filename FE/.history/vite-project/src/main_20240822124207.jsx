import { render } from "preact";
import { StrictMode, Suspense } from "react";
import { App } from "./app.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";
import "./i18n";

// createRoot(document.getElementById("root")).render(
//     <StrictMode>
//         <Suspense fallback="loading...">
//             <Provider store={store}>
//                 <App />
//             </Provider>
//             ,
//         </Suspense>
//     </StrictMode>
// );

render(
    <StrictMode>
        <Suspense fallback="loading...">
            <Provider store={store}>
                <App />
            </Provider>
            ,
        </Suspense>
    </StrictMode>,
    document.getElementById("app")
);

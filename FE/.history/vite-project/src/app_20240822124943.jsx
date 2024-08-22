import { BrowserRouter as Router } from "react-router-dom";
import AnimateRoute from "./Route/AnimateRoute";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

export function App() {
    const { i18n } = useTranslation();
    console.log(i18n.resolvedLanguage);
    return (
        <Router>
            <AnimateRoute></AnimateRoute>
            <ToastContainer />
        </Router>
    );
}

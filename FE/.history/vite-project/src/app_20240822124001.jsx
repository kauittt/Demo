import { BrowserRouter as Router } from "react-router-dom";
import AnimateRoute from "./Route/AnimateRoute";
import { ToastContainer } from "react-toastify";

export function App() {
    return (
        <Router>
            <AnimateRoute></AnimateRoute>
            <ToastContainer />
        </Router>
    );
}

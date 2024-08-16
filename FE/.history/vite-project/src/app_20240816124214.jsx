import { BrowserRouter as Router } from "react-router-dom";
import AnimateRoute from "./Route/AnimateRoute";
import { ToastContainer } from "react-toastify";

export function App() {
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    // 1536 - 703
    // 1920 - 1024
    // 0.8 - 0.7
    return (
        <Router>
            <AnimateRoute></AnimateRoute>
            <ToastContainer />
        </Router>
    );
}

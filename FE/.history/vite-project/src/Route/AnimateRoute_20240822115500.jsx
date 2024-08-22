import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import CustomersList from "./../components/customer/CustomersList";
import LoginPage from "../components/page/LoginPage";
import MainPage from "../components/page/MainPage";

const AnimateRoute = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainPage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/home" element={<CustomersList />} />

            <Route
                path="*"
                element={
                    <div className="text-center text-[100px]">
                        PAGE NOT FOUND
                    </div>
                }
            />
        </Routes>
    );
};

export default AnimateRoute;

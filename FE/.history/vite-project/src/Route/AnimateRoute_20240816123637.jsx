import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const AnimateRoute = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/" element={<MainPage />}>
                <Route path="/home" element={<HomePage />} />
            </Route>

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

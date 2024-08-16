import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainPage from "../pages/MainPage";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import BookDetailPage from "./../pages/BookDetailPage";
import BookPage from "../pages/BookPage";
import CheckoutPage from "../pages/CheckoutPage";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";

const AnimateRoute = () => {
    const location = useLocation();

    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/admin" element={<AdminPage />} />

            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/" element={<MainPage />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/books/:category" element={<BookPage />} />
                <Route path="/books/detail/:id" element={<BookDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/user" element={<UserPage />} />
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

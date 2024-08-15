import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Reducer/userSlice";
import bookSlice from "../Reducer/bookSlice";
import cartSlice from "../Reducer/cartSlice";
import orderSlice from "../Reducer/orderSlice";

const store = configureStore({
    reducer: {},
});

export default store;

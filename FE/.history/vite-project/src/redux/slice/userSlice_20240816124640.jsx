import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    totalUsers: null,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserSuccess(state, action) {
            state.user = action.payload;
            state.error = null;
        },
        getUserFailed(state, action) {
            state.error = action.payload;
        },
        getTotalUsersSuccess(state, action) {
            state.totalUsers = action.payload;
            state.error = null;
        },
        getTotalUsersFailed(state, action) {
            state.error = action.payload;
        },
        userLogout(state) {
            state.user = null;
            state.error = null;
        },
    },
});

export const {
    getUserSuccess,
    getUserFailed,
    userLogout,
    getTotalUsersSuccess,
    getTotalUsersFailed,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectTotalUsers = (state) => state.user.totalUsers;
export default userSlice.reducer;

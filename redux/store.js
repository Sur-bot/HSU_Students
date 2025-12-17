import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const mystore = configureStore({
    reducer: {
        auth: authReducer,
    },
});
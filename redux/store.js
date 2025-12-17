import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import scoreReducer from "./scoreSlice";
import subjectSlice from "./subjectSlice";

export const mystore = configureStore({
    reducer: {
        auth: authReducer,
        score: scoreReducer,
        subject: subjectSlice,
    },
});
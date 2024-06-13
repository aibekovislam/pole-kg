import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import fieldReducer from "./slices/fields/fieldSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        fields: fieldReducer
    }
})

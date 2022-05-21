import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "../features/stateSlice";

export const store = configureStore({
    reducer: {
        state: stateSlice
    }
})
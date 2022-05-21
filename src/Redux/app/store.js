import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "../features/pokemonSlice";
import stateSlice from "../features/stateSlice";

export const store = configureStore({
    reducer: {
        state: stateSlice,
        pokemon: pokemonSlice
    }
})
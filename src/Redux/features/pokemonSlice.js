import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  myPokemons: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
        state.pokemons = action.payload;
    },
    addPokemon: (state, action) => {
      state.myPokemons.unshift(action.payload);
      state.pokemons = state.pokemons.filter((doc) => action.payload.id !== doc.id);
    },
    deletePokemon: (state, action) => {
      state.pokemons = state.pokemons.filter(
        (doc) => doc.id !== action.payload
      );
    },
  },
});

export const { addPokemon, deletePokemon, setPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;

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
      // Calculating processs
      state.pokemons = action.payload.map((doc) => {
        let hp = Number(doc?.hp) || 0;
        let str = doc.attacks?.length;
        let wek = doc.weaknesses?.length || 0;
        let damage = 0;

        if (str > 0) {
          doc.attacks.forEach((item) => {
            damage += Number(item?.damage.replace(/[^0-9]/g, "")) || 0;
          });
        }

        let happiness = Number((hp / 10 + damage / 10 + 10 - wek) / 5);

        doc.strength = str === 1 ? 50 : str >= 2 ? 100 : 0;
        doc.hp = hp > 100 ? 100 : hp >= 0 ? hp : 0;
        doc.weaknesses = wek >= 1 ? 100 : 0;
        doc.damage = damage;
        doc.happiness = Math.ceil(happiness);

        return doc;
      });

      // Filter only unselected pokemons
      state.myPokemons.forEach((poke) => {
        state.pokemons = state.pokemons.filter((doc) => doc.id !== poke.id);
      });
    },
    addPokemon: (state, action) => {
      state.myPokemons.unshift(action.payload);
      state.pokemons = state.pokemons.filter(
        (doc) => action.payload.id !== doc.id
      );
    },
    deletePokemon: (state, action) => {
      state.myPokemons = state.myPokemons.filter(
        (doc) => doc.id !== action.payload
      );
    },
  },
});

export const { addPokemon, deletePokemon, setPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;

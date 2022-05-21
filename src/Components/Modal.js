import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPokemons, addPokemon } from "../Redux/features/pokemonSlice";
import PokemonCard from "./PokemonCard";
import "./Modal.css";

const Modal = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const [searchValue, setSearchValue] = useState("");
  const [controller, setController] = useState(null);

  const TYPES = [
    "Psychic",
    "Fighting",
    "Fairy",
    "Normal",
    "Grass",
    "Metal",
    "Water",
    "Lightning",
    "Darkness",
    "Colorless",
    "Fire",
  ];

  useEffect(() => {
    const ctrl = new AbortController();
    setController(ctrl);
    async function fetchData() {
      let url = "http://localhost:3030/api/cards";
      let value = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

      // Filter by type and name value
      if (TYPES.includes(value)) {
        url = url + `?limit=30&type=${value}`;
      } else if (searchValue !== "") {
        url = url + `?limit=30&name=${searchValue}`;
      }

      await Axios.get(url, { signal: ctrl.signal })
        .then((res) => {
          dispatch(setPokemons(res.data.cards));
        })
        .catch((error) => {});
    }

    fetchData();
  }, [searchValue]);

  useEffect(() => {
    return () => {
      controller && controller.abort();
    };
  }, [controller]);

  const onClickAddPokemon = useCallback((data) => {
    dispatch(addPokemon(data));
  }, []);

  return (
    <div className="modal">
      <div className="modal__input-search">
        <input
          type="text"
          name="search"
          placeholder="Find pokemon"
          className="modal__input"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <img
          src="/images/search.png"
          className="modal__search-icon"
          alt="icon-search"
        />
      </div>
      <div className="modal__results">
        {pokemons.length > 0 &&
          pokemons.map((item) => (
            <React.Fragment key={item.id}>
              <PokemonCard
                data={item}
                action="add"
                onClick={onClickAddPokemon}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Modal;

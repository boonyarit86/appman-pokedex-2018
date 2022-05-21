import React, { useEffect, useState } from "react";
import Axios from "axios";
import PokemonCard from "./PokemonCard";
import "./Modal.css";

const Modal = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const TYPES = [
    'Psychic',
    'Fighting',
    'Fairy',
    'Normal',
    'Grass',
    'Metal',
    'Water',
    'Lightning',
    'Darkness',
    'Colorless',
    'Fire'
  ];

  useEffect(() => {
    async function fetchData() {
      let url = "http://localhost:3030/api/cards";
      let value = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

      // Filter by type and name value
      if(TYPES.includes(value)) {
        url = url + `?limit=30&type=${value}`;
      } else if(searchValue !== "") {
        url = url + `?limit=30&name=${searchValue}`;
      }

      await Axios.get(url)
        .then((res) => {
          res.data.cards.map((doc) => {
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
            // console.log(doc.weaknesses)
          });

          setPokemons(res.data.cards);
          console.log(res.data.cards);
          // http://localhost:3030/api/cards?limit=30&name=Deoxys ex&type=Psychic
        })
        .catch((error) => {});
    }

    fetchData();
  }, [searchValue]);

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
        <img src="/images/search.png" className="modal__search-icon" />
      </div>
      <div className="modal__results">
        {pokemons.length > 0 &&
          pokemons.map((item) => (
            <React.Fragment key={item.id}>
              <PokemonCard data={item} />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Modal;

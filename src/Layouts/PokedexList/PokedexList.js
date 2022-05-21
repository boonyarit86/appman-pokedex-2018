import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePokemon } from "../../Redux/features/pokemonSlice";
import PokemonCard from "../../Components/PokemonCard";
import "./PokedexList.css"

const PokedexList = () => {
    const myPokemons = useSelector((state) => state.pokemon.myPokemons);
    const dispatch = useDispatch();

    const onClickDeletePokemon = useCallback((data) => {
        dispatch(deletePokemon(data.id));
    }, [])

    return (
        <section className="pokedexList">
            {myPokemons?.length > 0 && myPokemons.map((doc) => (
                <React.Fragment key={doc.id}>
                    <PokemonCard data={doc} action="delete" onClick={onClickDeletePokemon} />
                </React.Fragment>
            ))}
        </section>
    )
}

export default PokedexList;
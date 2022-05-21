import React from "react";
import "./PokemonCard.css";

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
};

const PokemonCard = ({ data, action, onClick }) => {
  return (
    <div className="pokemon__card">
      <img src={data.imageUrl} alt={data.name} className="pokemon__img" />
      <div className="pokemon__detail">
        <div className="pokemon__header">
          <h3 className="pokemon__name">{data.name}</h3>
          <div className="pokemon__type">
            <p style={{ backgroundColor: `${COLORS[data.type] || "blue"}` }}>
              {data.type || "none"}
            </p>
          </div>
          <p className="pokemon__action" onClick={() => onClick(data)}>
            {action === "add" ? "ADD" : "X"}
          </p>
        </div>
        <ul className="pokemon__status">
          <li className="pokemon__status-box">
            <p className="pokemon__title">HP</p>
            <div className="pokemon__progressBar">
              <div
                className="pokemon__progress"
                style={{ width: `calc((100%/100)*${data.hp})` }}
              />
            </div>
          </li>
          <li className="pokemon__status-box">
            <p className="pokemon__title">STR</p>
            <div className="pokemon__progressBar">
              <div
                className="pokemon__progress"
                style={{ width: `calc((100%/100)*${data.strength})` }}
              />
            </div>
          </li>
          <li className="pokemon__status-box">
            <p className="pokemon__title">WEAK</p>
            <div className="pokemon__progressBar">
              <div
                className="pokemon__progress"
                style={{ width: `calc((100%/100)*${data.weaknesses})` }}
              />
            </div>
          </li>
        </ul>
        <div className="pokemon__happiness">
          {Array.from({ length: data.happiness }, (v, index) => (
            <img src="/images/cute.png" alt="icon-happiness" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

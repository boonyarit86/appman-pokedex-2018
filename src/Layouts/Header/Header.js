import React from "react";
import "./Header.css";

const Header = React.memo(() => {
  return (
    <section className="header">
      <h1>My Pokedex</h1>
    </section>
  )
});

export default Header;

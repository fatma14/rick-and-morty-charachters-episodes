import React from "react";

import "./character.css";

export default function Character({ characterName, handleClick }) {
  return (
    <button
      className="characterName"
      onClick={(event) => {
        event.preventDefault();
        handleClick();
      }}
    >
      {characterName}
    </button>
  );
}

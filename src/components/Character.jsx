import React from "react";

export default function Character({ characterName, handleClick }) {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        handleClick();
      }}
    >
      {characterName}
    </button>
  );
}

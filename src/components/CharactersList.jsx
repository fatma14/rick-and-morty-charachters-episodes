import React from "react";

import Character from "./Character";
import "./characterList.css";

export default function CharactersList({ characters, selectCharacter }) {
  return (
    <div className="listElement">
      {characters.map((character) => (
        <Character
          key={character.id}
          characterName={character.name}
          handleClick={() => {
            selectCharacter(character);
          }}
        />
      ))}
    </div>
  );
}

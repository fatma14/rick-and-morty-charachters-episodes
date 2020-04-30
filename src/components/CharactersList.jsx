import React from "react";

import Character from "./Character";

export default function CharactersList({ characters, selectCharacter }) {
  return (
    <div>
      {characters.map((character) => (
        <Character
          characterName={character.name}
          handleClick={() => {
            selectCharacter(character.id);
          }}
        />
      ))}
    </div>
  );
}

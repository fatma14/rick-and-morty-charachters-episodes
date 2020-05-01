import React from "react";
import CharacterList from "./CharactersList";
import renderer from "react-test-renderer";

describe("CharacterList unit tests", () => {
  it("should match snapshot", () => {
    const characters = [
      { name: "joe", id: 1 },
      { name: "jill", id: 2 },
    ];
    const component = renderer.create(
      <CharacterList characters={characters} selectCharacter={() => {}} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call selectCharacter", () => {
    const selectCharacter = jest.fn();
    const characters = [
      { name: "Jack", id: 1 },
      { name: "Jane", id: 3 },
    ];
    const component = renderer.create(
      <CharacterList
        characters={characters}
        selectCharacter={selectCharacter}
      />
    );

    component.root
      .findAllByType("button")[0]
      .props.onClick({ preventDefault: () => {} });

    expect(selectCharacter).toBeCalledWith(characters[0]);
  });
});

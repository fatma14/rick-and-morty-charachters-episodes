import React, { Component } from "react";

import CharactersList from "./CharactersList";
import SearchBar from "./SearchBar";
import { getCharacters, getCharactersByName } from "../service/characters";
import "./searchPage.css";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      searchPhrase: "",
      page: 1,
    };
  }

  componentDidMount() {
    getCharacters().then((response) => {
      this.setState({
        characters: response.map(({ id, name }) => ({
          id,
          name,
        })),
      });
    });
  }

  handleChange(value) {
    const searchPhrase = this.state.searchPhrase;
    this.setState({
      searchPhrase: value,
    });

    getCharactersByName(searchPhrase).then((response) => {
      console.log(response);
      this.setState({
        characters: response.map(({ id, name }) => ({
          id,
          name,
        })),
      });
    });
  }

  changeCharacterId(id) {
    this.props.changeCharacterId(id);
  }

  render() {
    return (
      <div className="searchBox">
        <SearchBar handleChange={(value) => this.handleChange(value)} />
        <CharactersList
          characters={this.state.characters}
          selectCharacter={(...arg) => this.changeCharacterId(...arg)}
        />
      </div>
    );
  }
}

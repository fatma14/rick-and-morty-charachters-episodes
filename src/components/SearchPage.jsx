import React, { Component } from "react";

import CharactersList from "./CharactersList";
import SearchBar from "./SearchBar";
import {
  getCharacters,
  getCharactersByName,
  getPage,
} from "../service/characters";
import "./searchPage.css";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      searchPhrase: "",
      prev: undefined,
      next: undefined,
    };
  }

  async componentDidMount() {
    const response = await getCharacters();
    this.updateCharacters(response);
  }

  async handleChange(value) {
    const searchPhrase = this.state.searchPhrase;
    this.setState({
      searchPhrase: value,
    });

    const response = await getCharactersByName(searchPhrase);
    this.updateCharacters(response);
  }

  updateCharacters(response) {
    this.setState({
      characters: response.results.map(({ id, name }) => ({
        id,
        name,
      })),
      prev: response.info.prev === "" ? undefined : response.info.prev,
      next: response.info.next === "" ? undefined : response.info.next,
    });
  }

  changeCharacterId(id) {
    this.props.changeCharacterId(id);
  }

  async handleClick(url) {
    const response = await getPage(url);
    this.updateCharacters(response);
  }

  render() {
    return (
      <div className="searchBox">
        <SearchBar handleChange={(value) => this.handleChange(value)} />
        <CharactersList
          characters={this.state.characters}
          selectCharacter={(...arg) => this.changeCharacterId(...arg)}
        />
        <div className="buttons">
          {this.state.prev !== undefined ? (
            <button
              className="navigationButtons"
              onClick={(event) => {
                event.preventDefault();
                this.handleClick(this.state.prev);
              }}
            >
              Prev
            </button>
          ) : null}

          {this.state.next !== undefined ? (
            <button
              className="navigationButtons"
              onClick={(event) => {
                event.preventDefault();
                this.handleClick(this.state.next);
              }}
            >
              next
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

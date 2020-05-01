import React, { Component } from "react";

import CharactersList from "./CharactersList";
import SearchBar from "./SearchBar";
import {
  getCharacters,
  getCharactersByName,
  getPage,
  getCharactersBySpecie,
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
      species: undefined,
      recommendedCharacters: [],
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
      characters: response.results,
      prev: response.info.prev === "" ? undefined : response.info.prev,
      next: response.info.next === "" ? undefined : response.info.next,
    });
  }

  async changeCharacterId(character) {
    this.props.changeCharacterId(character.id);

    if (!this.state.species) {
      const response = await getCharactersBySpecie(character.species);
      this.setState({
        species: character.species,
        recommendedCharacters: response.results.slice(0, 5), // Show 5 recommended characters
      });
    }
  }

  async handleClick(url) {
    const response = await getPage(url);
    this.updateCharacters(response);
  }

  render() {
    return (
      <div className="selectCharacter">
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
        <div className="recommendedCharacters">
          {this.state.recommendedCharacters.length !== 0 ? (
            <div className="recommendationBox">
              <h3 className="recommendation">Recommended</h3>
              <CharactersList
                characters={this.state.recommendedCharacters}
                selectCharacter={(...arg) => this.changeCharacterId(...arg)}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

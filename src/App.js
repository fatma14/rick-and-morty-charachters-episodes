import React, { Component } from "react";

import "./App.css";

import SearchPage from "./components/SearchPage";
import EpisodesList from "./components/EpisodesList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCharacterId: undefined,
    };
  }

  changeCharacterId(id) {
    this.setState({
      chosenCharacterId: id,
    });
  }
  render() {
    return (
      <div>
        <SearchPage changeCharacterId={(id) => this.changeCharacterId(id)} />
        {this.state.chosenCharacterId !== undefined ? (
          <EpisodesList id={this.state.chosenCharacterId} />
        ) : null}
      </div>
    );
  }
}

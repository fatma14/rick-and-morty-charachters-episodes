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
    console.log("change", id);
    this.setState({
      chosenCharacterId: id,
    });
  }
  render() {
    console.log("render");
    return (
      <div className="appContainer">
        <SearchPage changeCharacterId={(id) => this.changeCharacterId(id)} />
        {this.state.chosenCharacterId !== undefined ? (
          <EpisodesList id={this.state.chosenCharacterId} />
        ) : null}
      </div>
    );
  }
}

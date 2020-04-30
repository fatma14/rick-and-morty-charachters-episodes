import React, { Component } from "react";

import { getCharacterById } from "../service/characters";
import Episode from "./Episode";
import "./episodesList.css";

export default class EpisodesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      image: undefined,
    };
  }

  componentDidMount() {
    this.fetchCharacter();
  }

  async fetchCharacter() {
    const response = await getCharacterById(this.props.id);
    this.setState({
      episodes: response.episode,
      image: response.image,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchCharacter();
    }
  }

  render() {
    return (
      <div className="episodeList">
        {this.state.episodes && this.state.image ? (
          <div className="infosContainer">
            <img
              src={this.state.image}
              alt="character"
              className="characterImage"
            />

            <div className="episodeInfo">
              {this.state.episodes.map((episodeURL) => (
                <Episode key={episodeURL} episodeURL={episodeURL} />
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

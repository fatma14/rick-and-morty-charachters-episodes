import React, { Component } from "react";

import { getCharacterById } from "../service/characters";
import Episode from "./Episode";

export default class EpisodesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      image: undefined,
    };
  }

  componentDidMount() {
    getCharacterById(this.props.id).then((response) => {
      this.setState({
        episodes: response.episode,
        image: response.image,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.episodes && this.state.image ? (
          <>
            <img src={this.state.image} />
            {this.state.episodes.map((episodeURL) => (
              <Episode episodeURL={episodeURL} />
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

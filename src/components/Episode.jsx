import React, { Component } from "react";

import getEpisodeById from "../service/episodes";
import "./episode.css";

export default class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      air_date: "",
    };
  }
  componentDidMount() {
    getEpisodeById(this.props.episodeURL).then((response) => {
      this.setState({
        name: response.name,
        air_date: response.air_date,
        code: response.episode,
      });
    });
  }

  render() {
    return (
      <div className="episodeContainer">
        <h3> {this.state.name} </h3>
        <div>
          <b>Episode Code:</b> {this.state.code}{" "}
        </div>
        <div>
          <b>Air Date:</b> {this.state.air_date}{" "}
        </div>
      </div>
    );
  }
}

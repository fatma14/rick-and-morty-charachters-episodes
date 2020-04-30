import React from "react";
import renderer from "react-test-renderer";
import EpisodeList from "./EpisodesList";
import "../service/episodes";
import "../service/characters";
import "./Episode";

let mockGetCharacterById;

jest.mock("../service/characters", () => ({
  __esModule: true,
  getCharacterById: () => {
    return mockGetCharacterById;
  },
}));

jest.mock("./Episode", () => ({
  __esModule: true,
  default: (props) => <mock-episode {...props} />,
}));

describe("EpisodeList Unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const character = {
      episode: ["episodeUrl1", "episodeUrl2"],
      image: "imageUrl",
    };

    mockGetCharacterById = new Promise((resolve) => {
      resolve(character);
    });
    let component;
    await renderer.act(async () => {
      component = renderer.create(<EpisodeList id="1" />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should change character when new id is passed", async () => {
    const character1 = {
      episode: ["episodeUrl1", "episodeUrl2"],
      image: "imageUrl",
    };

    mockGetCharacterById = new Promise((resolve) => {
      resolve(character1);
    });
    let component;
    await renderer.act(async () => {
      component = renderer.create(<EpisodeList id="1" />);
    });

    const character2 = {
      episode: ["episodeUrl1"],
      image: "anotherImage",
    };
    mockGetCharacterById = new Promise((resolve) => {
      resolve(character2);
    });
    await renderer.act(async () => {
      component = renderer.create(<EpisodeList id="2" />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});

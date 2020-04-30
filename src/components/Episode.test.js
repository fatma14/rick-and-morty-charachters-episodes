import React from "react";
import renderer from "react-test-renderer";
import Episode from "./Episode";
import "../service/episodes";

let mockGetEpisodeById;

jest.mock("../service/episodes", () => ({
  __esModule: true,
  default: () => {
    return mockGetEpisodeById;
  },
}));

describe("Episode Unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const episode = {
      name: "test 1",
      air_date: "4th July",
      episodeu: "S01E01",
    };

    mockGetEpisodeById = new Promise((resolve) => {
      resolve(episode);
    });
    let component;
    await renderer.act(async () => {
      component = renderer.create(<Episode />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});

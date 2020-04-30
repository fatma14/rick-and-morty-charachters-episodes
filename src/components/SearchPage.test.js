import React from "react";
import renderer from "react-test-renderer";
import SearchPage from "./SearchPage";
import "./Episode";
import { getPage } from "../service/characters";
import "./CharactersList";
import "./SearchBar";

let mockGetCharacters;
let mockGetCharactersByName;
let mockGetPage;

jest.mock("../service/characters", () => ({
  __esModule: true,
  getCharacters: () => mockGetCharacters,
  getCharactersByName: () => mockGetCharactersByName,
  getPage: jest.fn(() => mockGetPage),
}));

jest.mock("./CharactersList", () => ({
  __esModule: true,
  default: (props) => <mock-CharactersList {...props} />,
}));

jest.mock("./SearchBar", (props) => ({
  __esModule: true,
  default: (props) => <mock-SearchBar {...props} />,
}));

describe("SearchPage unit test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot without prev/next buttons", async () => {
    const characters = {
      results: [{ id: 1, name: "test" }],
      info: {
        prev: "",
        next: "",
      },
    };
    mockGetCharacters = new Promise((resolve) => {
      resolve(characters);
    });

    let component;
    await renderer.act(async () => {
      component = renderer.create(<SearchPage changeCharacterId={() => {}} />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });

  describe("Pagination", () => {
    it("should match snapshot with prev/next buttons", async () => {
      const characters = {
        results: [{ id: 1, name: "test" }],
        info: {
          prev: "prevPage",
          next: "nextPage",
        },
      };
      mockGetCharacters = new Promise((resolve) => {
        resolve(characters);
      });

      let component;
      await renderer.act(async () => {
        component = renderer.create(
          <SearchPage changeCharacterId={() => {}} />
        );
      });

      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should call getPage when clicking on next Page", async () => {
      const characters = {
        results: [{ id: 1, name: "test" }],
        info: {
          prev: "prevPage",
          next: "nextPage",
        },
      };
      mockGetCharacters = Promise.resolve(characters);
      mockGetPage = Promise.resolve(characters);

      let component;
      await renderer.act(async () => {
        component = renderer.create(
          <SearchPage changeCharacterId={() => {}} />
        );
      });
      component.root
        .findAllByType("button")[0]
        .props.onClick({ preventDefault: () => {} });

      expect(getPage).toBeCalled();
    });
  });
});

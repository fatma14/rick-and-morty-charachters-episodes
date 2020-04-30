import React from "react";
import SearchBar from "./SearchBar";
import renderer from "react-test-renderer";

describe("SearchBar unit tests", () => {
  it("should match snapshot", () => {
    const component = renderer.create(
      <SearchBar searchPhrase="ein" handleChange={() => {}} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call handle change", () => {
    const handleChange = jest.fn();
    const value = "test";
    const component = renderer.create(
      <SearchBar searchPhrase="kal" handleChange={handleChange} />
    );
    component.root
      .findByType("input")
      .props.onChange({ preventDefault: () => {}, target: { value: value } });

    expect(handleChange).toBeCalledWith(value);
  });
});

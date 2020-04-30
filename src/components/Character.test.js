import React from "react";
import Character from "./Character";
import renderer from "react-test-renderer";

test("should match snapshot", () => {
  const component = renderer.create(
    <Character characterName="Joe" handleClick={() => {}} />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("should call handle click", () => {
  const handleClick = jest.fn();
  const component = renderer.create(
    <Character characterName="Joe" handleClick={handleClick} />
  );

  component.root
    .findByType("button")
    .props.onClick({ preventDefault: () => {} });

  expect(handleClick).toBeCalled();
});

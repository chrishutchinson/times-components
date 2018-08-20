import React from "react";
import TestRenderer from "react-test-renderer";
import Puff from "../src/puff";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <Puff />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};

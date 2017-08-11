/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { Text } from "react-native";
import { shallow } from "enzyme";
import pagination from "../pagination-helper";

it("renders inner component with page 1", () => {
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
  const PageChanger = pagination(Component);

  const props = {
    page: 1
  };

  const component = renderer.create(<PageChanger {...props} />);
  expect(component).toMatchSnapshot();
});

it("renders inner component with new props", () => {
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
  const PageChanger = pagination(Component);

  const props = {
    foo: "not bar",
    page: 1
  };

  const wrapper = shallow(<PageChanger {...props} />);

  wrapper.setProps({ foo: "bar" });
  wrapper.update();

  expect(wrapper.state().foo).toEqual("bar");
  expect(wrapper.state().page).toEqual(1);
  expect(wrapper).toMatchSnapshot();
});

it("renders inner component with prev page", () => {
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
  const PageChanger = pagination(Component);

  const props = {
    page: 2
  };

  const wrapper = shallow(<PageChanger {...props} />);
  wrapper.instance().handleChangePage(1);
  wrapper.update();

  expect(wrapper.state().page).toEqual(1);
  expect(wrapper).toMatchSnapshot();
});

it("renders inner component with next page", () => {
  const Component = props => <Text>{JSON.stringify(props, null, 2)}</Text>;
  const PageChanger = pagination(Component);

  const props = {
    page: 2
  };

  const wrapper = shallow(<PageChanger {...props} />);
  wrapper.instance().handleChangePage(3);
  wrapper.update();

  expect(wrapper.state().page).toEqual(3);
  expect(wrapper).toMatchSnapshot();
});

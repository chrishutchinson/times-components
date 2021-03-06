import React from "react";
import { mount, shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  rnwTransform,
  stylePrinter,
  replacePropTransform
} from "@times-components/jest-serializer";
import { hash, iterator } from "@times-components/test-utils";
import Pagination from "../../src/pagination";

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  compose(
    stylePrinter,
    rnwTransform(),
    minimalWebTransform,
    minimaliseTransform(
      (value, key) =>
        key === "style" || key === "className" || key === "data-testid"
    ),
    replacePropTransform((value, key) => (key === "d" ? hash(value) : value))
  )
);

const tests = [
  {
    name: "renders results, previous and next",
    test: () => {
      const props = {
        count: 20,
        page: 5,
        pageSize: 3
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "renders with no results",
    test: () => {
      const props = {
        count: 20,
        page: 5,
        pageSize: 3,
        hideResults: true
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "does not give a count smaller than a single page",
    test: () => {
      const props = {
        count: 20,
        page: 1,
        pageSize: 25
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "limits the starting result to the total count",
    test: () => {
      const props = {
        count: 20,
        page: 4,
        pageSize: 10
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "renders previous and not next",
    test: () => {
      const props = {
        count: 20,
        page: 5,
        pageSize: 4,
        hideResults: true
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "renders next and not previous",
    test: () => {
      const props = {
        count: 20,
        page: 1,
        pageSize: 4,
        hideResults: true
      };

      const wrapper = mount(<Pagination {...props} />);

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "tracks next page interaction",
    test: () => {
      const stream = jest.fn();
      const wrapper = shallow(<Pagination count={21} page={1} />, {
        context: { tracking: { analytics: stream } }
      });

      wrapper
        .dive()
        .find("Link")
        .simulate("press");

      expect(stream).toHaveBeenCalledWith({
        component: "Pagination",
        action: "Pressed",
        attrs: {
          direction: "next",
          destinationPage: 2
        }
      });
    }
  },
  {
    name: "tracks previous page interaction",
    test: () => {
      const stream = jest.fn();
      const wrapper = shallow(<Pagination count={21} page={2} />, {
        context: { tracking: { analytics: stream } }
      });

      wrapper
        .dive()
        .find("Link")
        .simulate("press");

      expect(stream).toHaveBeenCalledWith({
        component: "Pagination",
        action: "Pressed",
        attrs: {
          direction: "previous",
          destinationPage: 1
        }
      });
    }
  }
];

iterator(tests);

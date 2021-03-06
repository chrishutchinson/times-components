import React from "react";
import coreRenderers from "@times-components/markup";
import { Text } from "react-native";

export default {
  ...coreRenderers,
  link(key, attributes, renderedChildren) {
    return {
      element: <Text key={key}>{renderedChildren}</Text>
    };
  },
  paragraph(key, attributes, renderedChildren, index) {
    const padding = renderedChildren.length && index !== 0 ? " " : "";
    return {
      element: (
        <Text key={key}>
          {padding}
          {renderedChildren}
        </Text>
      )
    };
  },
  teaser(key, { isSingle }, renderedChildren) {
    const padding = isSingle ? "" : " ";
    return {
      element: (
        <Text key={key}>
          {padding}
          {renderedChildren}...
        </Text>
      )
    };
  }
};

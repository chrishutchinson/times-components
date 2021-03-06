import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  hoistStyleTransform,
  justChildren,
  meltNative,
  minimalWebTransform,
  propsNoChildren,
  replaceTransform,
  rnwTransform,
  stylePrinter
} from "@times-components/jest-serializer";

const styles = [
  "alignItems",
  "display",
  "flex",
  "flexDirection",
  "flexWrap",
  "height",
  "justifyContent",
  "marginBottom",
  "maxWidth",
  "minWidth"
];

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      stylePrinter,
      replaceTransform({
        CardComponent: justChildren,
        Gradient: propsNoChildren,
        Loading: justChildren,
        TimesImage: propsNoChildren,
        ...meltNative
      }),
      flattenStyleTransform,
      hoistStyleTransform,
      minimalWebTransform,
      rnwTransform(styles)
    )
  );

  // eslint-disable-next-line global-require
  require("jest-styled-components");
};

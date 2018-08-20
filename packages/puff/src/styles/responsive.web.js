import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";

const PuffWrapper = withResponsiveStyles(View, {
  smallUp: () => `
    .puffImage {
      flex-grow: 2 !important;
      margin-bottom: 0;
      min-width: 200px;
      padding-right: 15px;
    }
    .puffContent {
      flex-grow: 2.7 !important;
      min-width: 220px;
    }
  `
});

export default PuffWrapper;

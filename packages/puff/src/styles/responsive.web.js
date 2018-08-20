import { Text, View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";

export const PuffWrapper = styled(View)`
  @media (min-width: ${breakpoints.small}px) {
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
  }
`;

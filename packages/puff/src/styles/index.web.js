import { StyleSheet } from "react-native";
import sharedStyles from "./shared";

const styles = StyleSheet.create({
  ...sharedStyles,
  PuffBody: {
    ...sharedStyles.PuffBody,
    color: "blue"
  }
});

export default styles;

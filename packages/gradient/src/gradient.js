import React, { Component } from "react";
import { ART, StyleSheet, View } from "react-native";
import { colours } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./gradient-prop-types";

const { LinearGradient, Path, Shape, Surface } = ART;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  surface: { position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }
});

function angleToPoints(angle) {
  const segment = Math.floor(angle / Math.PI * 2) + 2;
  const diagonal = (1 / 2 * segment + 1 / 4) * Math.PI;
  const op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
  const x = op * Math.cos(angle);
  const y = op * Math.sin(angle);

  return {
    start: {
      x: x < 0 ? 1 : 0,
      y: y < 0 ? 1 : 0
    },
    end: {
      x: x >= 0 ? x : x + 1,
      y: y >= 0 ? y : y + 1
    }
  };
}

class Gradient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0
    };
  }

  onLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    this.setState({ width, height });
  };

  render() {
    const { height, width } = this.state;
    const { children, degrees, style } = this.props;

    const { start, end } = angleToPoints((degrees + 90) / 180 * Math.PI);

    const d = new Path()
      .line(width, 0)
      .line(0, height)
      .line(-width, 0)
      .line(0, -height);

    return (
      <View onLayout={this.onLayout} style={[styles.container, style]}>
        <Surface height={height} style={styles.surface} width={width}>
          <Shape
            d={d}
            fill={
              new LinearGradient(
                {
                  "0": colours.functional.backgroundPrimary,
                  "1": colours.functional.backgroundSecondary
                },
                width * start.x,
                height * start.y,
                width * end.x,
                height * end.y
              )
            }
          />
        </Surface>
        {children}
      </View>
    );
  }
}

Gradient.propTypes = propTypes;
Gradient.defaultProps = defaultProps;

export default Gradient;

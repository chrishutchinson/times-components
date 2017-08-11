import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import PropTypes from "prop-types";
import pagination from "./pagination-helper";

const styles = StyleSheet.create({
  compact: {
    position: "absolute",
    right: 0,
    left: 0
  },
  container: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column"
  },
  horizontal: {
    display: "flex",
    flexDirection: "row",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderTopColor: "#dbdbdb",
    borderTopWidth: 1,
    justifyContent: "space-between"
  },
  arrows: {
    color: "#006699",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 14,
    lineHeight: 38
  },
  label: {
    color: "#696969",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
    paddingBottom: 11,
    paddingTop: 11
  }
});

const shouldRenderOneLine = width => width >= 700;

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    const {
      compact,
      count,
      generatePageLink,
      page,
      pageSize,
      onNext,
      onPrev
    } = props;

    this.state = {
      compact,
      count,
      isCompact: false,
      generatePageLink,
      page,
      pageSize,
      onNext,
      onPrev
    };

    this.handleLayout = this.handleLayout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      Object.assign({}, nextProps, {
        isCompact: this.state.isCompact
      })
    );
  }

  handleLayout({ nativeEvent }) {
    const { width } = nativeEvent.layout;

    return this.setState({
      isCompact: shouldRenderOneLine(width)
    });
  }

  render() {
    const {
      compact,
      count,
      generatePageLink,
      page,
      pageSize,
      onNext,
      onPrev
    } = this.state;

    const startResult = (page - 1) * pageSize + 1;
    const finalResult = Math.min(count, page * pageSize);
    const message = `Showing ${startResult} - ${finalResult} of ${count} results`;

    const prevComponent = startResult > pageSize
      ? <TouchableHighlight>
          <Text
            accessibilityRole="link"
            href={generatePageLink(page - 1)}
            style={styles.arrows}
            onPress={() => onPrev(page - 1)}
          >
            {"< Previous page"}
          </Text>
        </TouchableHighlight>
      : null;

    const nextComponent = finalResult < count
      ? <TouchableHighlight>
          <Text
            accessibilityRole="link"
            href={generatePageLink(page + 1)}
            style={styles.arrows}
            onPress={() => onNext(page + 1)}
          >
            {"Next page >"}
          </Text>
        </TouchableHighlight>
      : null;

    const messageComponent = !compact
      ? <Text
          style={[styles.label, this.state.isCompact ? styles.compact : null]}
        >
          {message}
        </Text>
      : null;

    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        {messageComponent}
        <View style={styles.horizontal}>
          <View>{prevComponent}</View>
          <View>{nextComponent}</View>
        </View>
      </View>
    );
  }
}

Pagination.propTypes = {
  compact: PropTypes.bool,
  count: PropTypes.number.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  generatePageLink: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func
};

Pagination.defaultProps = {
  compact: false,
  generatePageLink: page => `./${page}`,
  page: 1,
  pageSize: 20,
  onNext: () => {},
  onPrev: () => {}
};

export default Pagination;

export { pagination };

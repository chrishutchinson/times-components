import React from "react";
import PropTypes from "prop-types";

export default Component => {
  class Helper extends React.Component {
    constructor(props) {
      super(props);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.state = props;
    }

    componentWillReceiveProps(nextProps) {
      return this.setState(
        Object.assign({}, nextProps, {
          page: this.state.page
        })
      );
    }

    handleChangePage(page) {
      return this.setState({ page });
    }

    render() {
      return (
        <Component
          {...this.state}
          onNext={this.handleChangePage}
          onPrev={this.handleChangePage}
        />
      );
    }
  }

  Helper.displayName = `Pagination Helper (${Component.displayName})`;
  Helper.propTypes = {
    page: PropTypes.number
  };

  Helper.defaultProps = {
    page: 1
  };

  return Helper;
};

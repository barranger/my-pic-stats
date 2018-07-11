import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";

class HeaderLinks extends React.Component {
  state = {
    open: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return null;
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);

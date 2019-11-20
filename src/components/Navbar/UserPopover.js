import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../shared";

class UserPopover extends Component {
  render() {
    return <p onClick={() => this.props.logoutUser()}>Logout</p>;
  }
}

export default connect(null, { logoutUser })(UserPopover);

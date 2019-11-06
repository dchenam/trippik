import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { logoutUser } from "../../shared";

class UserPopover extends Component {
  render() {
    return <Button onClick={() => this.props.logoutUser()}>Logout</Button>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPopover);

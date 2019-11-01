import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { logoutUser } from "../../shared";

class UserPopover extends Component {
  render() {
    return (
      <div>
        <Button onClick={() => this.props.logoutUser()}>Logout</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPopover);

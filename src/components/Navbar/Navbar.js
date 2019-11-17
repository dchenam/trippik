import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { connect } from "react-redux";
import UserPopover from "./UserPopover";

class Navbar extends Component {
  renderContent() {
    switch (this.props.auth.isAuthenticated) {
      case true:
        return (
          <Menu.Item style={{ float: "right" }}>
            <UserPopover />
          </Menu.Item>
        );
      default:
        return (
          <Menu.Item style={{ float: "right" }}>
            <Link to="/account/login">Login</Link>
          </Menu.Item>
        );
    }
  }

  render() {
    return (
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        <Menu.Item>
          <Link to="/">Trip Builder</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/places">Browse Places</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/places/new">Add a Place</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/trips">My Trips</Link>
        </Menu.Item>
        {this.renderContent()}
      </Menu>
    );
  }
}

const mapStatetoProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStatetoProps)(Navbar);

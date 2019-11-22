import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import { logoutUser } from "../../shared";

class Navbar extends Component {
  renderLoginContent() {
    switch (this.props.auth.isAuthenticated) {
      case true:
        return (
          <Menu.Item
            className="menu-right"
            onClick={() => this.props.logoutUser()}
          >
            Logout
          </Menu.Item>
        );
      default:
        return (
          <Menu.Item className="menu-right">
            <Link to="/account/login">Login</Link>
          </Menu.Item>
        );
    }
  }
  renderMyTrips() {
    if (this.props.auth.isAuthenticated) {
      return (
        <Menu.Item key="/trips">
          <Link to="/trips">My Trips</Link>
        </Menu.Item>
      );
    }
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[this.props.location.pathname]}
        className="menu"
      >
        <Menu.Item key="/">
          <Link to="/">Trip Builder</Link>
        </Menu.Item>
        <Menu.Item key="/places">
          <Link to="/places">Browse Places</Link>
        </Menu.Item>
        <Menu.Item key="/places/new">
          <Link to="/places/new">Add a Place</Link>
        </Menu.Item>
        {this.renderMyTrips()}
        {this.renderLoginContent()}
      </Menu>
    );
  }
}

const mapStatetoProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStatetoProps, { logoutUser })(withRouter(Navbar));

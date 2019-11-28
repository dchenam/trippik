import { Menu } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../services/auth";

class Navbar extends Component {
  renderLoginContent() {
    switch (this.props.auth.isAuthenticated) {
      case true:
        return (
          <Menu.Item onClick={() => this.props.logoutUser()}>Logout</Menu.Item>
        );
      default:
        return (
          <Menu.Item>
            <Link to="/user/login">Login</Link>
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

  renderAddPlace() {
    if (this.props.auth.isAuthenticated) {
      return (
        <Menu.Item key="/places/new">
          <Link to="/places/new">Add a Place</Link>
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
        {this.renderAddPlace()}
        <Menu.Item className="menu-right" />
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

import { Alert, Button, Form, Icon, Input, Spin } from "antd";

import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../../../services/auth";
import "./style.css";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { history, location } = this.props;
        const { username, password } = values;
        this.props.loginUser(username, password, history, location);
      }
    });
  };

  renderContent() {
    const { auth, location } = this.props;

    if (auth.isLoading) {
      return <Spin />;
    }

    if (auth.isAuthenticated) {
      const { state = {} } = location;
      const { prevLocation } = state;
      return <Redirect to={prevLocation || "/"} />;
    }

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-page">
        <h5>Your Account</h5>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <a className="login-form-forgot" href="/">
              Forgot password
            </a>
            <Link className="login-form-register" to="/user/register">
              Sign Up!
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
  render() {
    const { error } = this.props.auth;
    return (
      <div>
        {error ? <Alert message={error.statusText} type="error" /> : null}
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { loginUser })(
  Form.create({ name: "normal_login" })(Login)
);

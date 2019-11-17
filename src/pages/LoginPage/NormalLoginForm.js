import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Spin } from "antd";
import "./LoginForm.css";
import { loginUser } from "../../shared/auth/actions";

class NormalLoginForm extends Component {
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

  renderErrors() {
    if (typeof this.props.errors === "undefined") return;
    const { non_field_errors } = this.props.errors;
    non_field_errors.map(message => {
      return <p style={{ color: "red" }}>{message}</p>;
    });
  }

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
        <h1>Your Account</h1>
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
            <a className="login-form-register" href="/">
              Sign Up!
            </a>
          </Form.Item>
          {/* {this.renderErrors()} */}
        </Form>
      </div>
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  const errors = auth.errors ? auth.errors.data : null;
  return {
    auth,
    errors
  };
};

export default connect(mapStateToProps, { loginUser })(
  Form.create({ name: "normal_login" })(NormalLoginForm)
);

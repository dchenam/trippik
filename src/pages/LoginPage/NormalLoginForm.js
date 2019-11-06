import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button } from "antd";
import "./LoginForm.css";
import { loginUser } from "../../shared/auth/actions";

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        this.props.loginUser(username, password);
      }
    });
  };

  renderErrors() {
    if (this.props.errors.length === 0) {
      return;
    } else {
      const { non_field_errors } = this.props.errors[2].message.data;
      return <p style={{ color: "red" }}>{non_field_errors[0]}</p>;
    }
  }

  render() {
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
          {this.renderErrors()}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Form.create({ name: "normal_login" })(NormalLoginForm));

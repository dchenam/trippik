import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Icon, Button } from "antd";
import "./Registration.css";

class RegistrationPage extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="registration-page">
        <h1>Create an Account</h1>
        <Form onSubmit={this.handleSubmit}>
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
          <Form.Item hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
                { validator: this.validateToNextPassword }
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
          <Form.Item hasFeedback>
            {getFieldDecorator("confirm-password", {
              rules: [
                { required: true, message: "Please confirm your Password!" },
                { validator: this.compareToFirstPassword }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Confirm Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(Form.create({ name: "user-registration" })(RegistrationPage));

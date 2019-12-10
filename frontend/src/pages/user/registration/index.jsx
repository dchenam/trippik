import { Button, Form, Icon, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../../services/auth';
import './style.css';

class Registration extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.registerUser(values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password1')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateEmail = (rule, value, callback) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      callback();
    } else {
      callback('You entered an invalid email!');
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="registration-page">
        <h5>Create an Account</h5>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input your email!' },
                { validator: this.validateEmail },
              ],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password1', {
              rules: [
                { required: true, message: 'Please input your Password!' },
                { validator: this.validateToNextPassword },
                { min: 8, message: 'password must be at least 8 characters' },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('password2', {
              rules: [
                { required: true, message: 'Please confirm your Password!' },
                { validator: this.compareToFirstPassword },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Confirm Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="signup-form-button">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(null, { registerUser })(
  Form.create({ name: 'user-registration' })(Registration),
);

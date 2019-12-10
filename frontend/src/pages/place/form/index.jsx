import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createPlace } from '../actions';
import { countrySelect } from './options';
import './style.css';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
};

class PlaceForm extends Component {
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.props.createPlace(values);
      }
    });
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout} className="place-form">
        <Form.Item label="Place Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'please input a name' }],
          })(<Input placeholder="Amazing Cafe" />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'please input a description' }],
          })(
            <Input.TextArea
              placeholder="Something something"
              autoSize={{ minRows: 3, maxRows: 8 }}
            />,
          )}
        </Form.Item>
        <Form.Item label="Street Address">
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'please input a street addresss' }],
          })(<Input placeholder="123 Street" />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator('city', {
            rules: [{ required: true, message: 'please input a city' }],
          })(<Input placeholder="San Francisco" />)}
        </Form.Item>
        <Form.Item label="State">
          {getFieldDecorator('state')(<Input placeholder="CA" />)}
        </Form.Item>
        <Form.Item label="ZIP">
          {getFieldDecorator('zip', {
            rules: [
              {
                pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
                message: 'please input a valid ZIP code',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Country">
          {getFieldDecorator('country', {
            rules: [{ required: true, message: 'please input a country' }],
          })(countrySelect())}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
          <Button type="primary" htmlType="submit" size="large" style={{ marginRight: '1rem' }}>
            Submit
          </Button>
          <Button size="large" onClick={() => this.props.push('/places')}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }

  render() {
    return (
      <div className="place-form-container">
        <h5 style={{ alignSelf: 'center' }}>{"Let's create a new place!"} </h5>
        {this.renderForm()}
      </div>
    );
  }
}

export default Form.create({ name: 'place-form' })(connect(null, { createPlace, push })(PlaceForm));

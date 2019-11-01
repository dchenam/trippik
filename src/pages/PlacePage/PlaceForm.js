import React, { Component } from "react";
import { Button, Form, Input } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  }
};

class PlaceForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("received values", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        onSubmit={this.handleSubmit}
        {...formItemLayout}
        className="place-form"
      >
        <Form.Item label="Place Name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "please input a name" }]
          })(<Input placeholder="name" />)}
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            placeholder="description"
            autoSize={{ minRows: 3, maxRows: 8 }}
          />
        </Form.Item>
        <Form.Item label="Street Address">
          {getFieldDecorator("Street Address", {
            rules: [
              { required: true, message: "please input a street addresss" }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("City", {
            rules: [{ required: true, message: "please input a city" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="State">
          {getFieldDecorator("State", {
            rules: [{ required: true, message: "please input a state" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="ZIP">
          {getFieldDecorator("ZIP", {
            rules: [{ required: true, message: "please input a ZIP" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
          <Button size="large" href="/places">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "place-form" })(PlaceForm);

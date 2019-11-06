import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { createPlace } from "./actions";

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
        this.props.createPlace(values, this.props.history);
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
          {getFieldDecorator("description", {
            rules: [{ required: true, message: "please input a description" }]
          })(
            <Input.TextArea
              placeholder="description"
              autoSize={{ minRows: 3, maxRows: 8 }}
            />
          )}
        </Form.Item>
        <Form.Item label="Street Address">
          {getFieldDecorator("address", {
            rules: [
              { required: true, message: "please input a street addresss" }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [{ required: true, message: "please input a city" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="State">
          {getFieldDecorator("state", {
            rules: [{ required: true, message: "please input a state" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="ZIP">
          {getFieldDecorator("zip", {
            rules: [{ required: true, message: "please input a ZIP" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
          <Button
            size="large"
            onClick={() => this.props.history.push("/places")}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  null,
  { createPlace }
)(Form.create({ name: "place-form" })(withRouter(PlaceForm)));

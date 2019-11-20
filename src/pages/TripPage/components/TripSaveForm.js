import React, { Component } from "react";
import { Modal, Form, Input, DatePicker } from "antd";

class TripSaveForm extends Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Save Trip"
        okText="Save"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "please add a name" }]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Summary">
            {getFieldDecorator("summary", {
              rules: []
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Date">
            {getFieldDecorator("date", {
              rules: [{ required: true, message: "please add a date" }]
            })(<DatePicker />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "trip-save-form" })(TripSaveForm);

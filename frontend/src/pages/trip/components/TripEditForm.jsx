import { DatePicker, Form, Input, Modal } from 'antd';
import React from 'react';

const TripEditForm = props => {
  const { visible, handleModalVisible, handleCreate, form } = props;
  const { getFieldDecorator } = form;
  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleCreate(fieldsValue);
    });
  };
  return (
    <Modal
      visible={visible}
      title="Edit Trip"
      okText="Save"
      onCancel={() => handleModalVisible()}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'please add a name' }],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Summary">
          {getFieldDecorator('summary', {
            rules: [],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Date">
          {getFieldDecorator('date', {
            rules: [{ required: true, message: 'please add a date' }],
          })(<DatePicker />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(TripEditForm);

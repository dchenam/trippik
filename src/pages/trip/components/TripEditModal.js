import { Button, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import TripEditForm from "./TripEditForm";
import { updateTrip } from "../editor/actions";

class TripEditModal extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = e => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.date = values.date.toISOString();
      this.props.updateTrip(this.props.data, values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    return (
      <>
        <Button onClick={this.showModal}>
          <Icon type="edit" theme="outlined" />
          Edit Trip
        </Button>
        <TripEditForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </>
    );
  }
}

export default connect(null, { updateTrip })(TripEditModal);

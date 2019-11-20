import React, { Component } from "react";
import { connect } from "react-redux";
import TripSaveForm from "./TripSaveForm";
import { Button, Icon } from "antd";
import { updateTrip } from "../actions";

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
      // console.log("received values: ", values);
      this.props.updateTrip(this.props.trip.data, values);
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
          <Icon type="save" theme="outlined" />
          Save
        </Button>
        <TripSaveForm
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

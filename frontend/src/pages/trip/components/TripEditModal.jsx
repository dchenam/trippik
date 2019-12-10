import { Button, Icon } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTrip } from '../editor/actions';
import TripEditForm from './TripEditForm';

class TripEditModal extends Component {
  state = { visible: false };

  handleModalVisible = flag => {
    this.setState({ visible: !!flag });
  };

  handleCreate = values => {
    const newValues = { ...values, date: values.data.format('YYYY-MM-DD') };
    this.props.updateTrip(this.props.data, newValues);
    this.handleModalVisible();
  };

  render() {
    const createMethods = {
      handleCreate: this.handleCreate,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <>
        <Button onClick={() => this.handleModalVisible(true)}>
          <Icon type="edit" theme="outlined" />
          Edit Trip
        </Button>
        <TripEditForm {...createMethods} visible={this.state.visible} />
      </>
    );
  }
}

export default connect(null, { updateTrip })(TripEditModal);

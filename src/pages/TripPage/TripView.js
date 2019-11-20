import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Descriptions, Button, Icon, Divider } from "antd";
import TripTable from "./TripTable";
import { setCurrentTrip } from "./actions";

class TripView extends Component {
  handleEdit = () => {
    this.props.setCurrentTrip(this.props.data);
    this.props.push("/");
  };
  render() {
    const { name, summary } = this.props.data;
    return (
      <div className="trip-view-container">
        <Descriptions title="Trip Info">
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Summary">{summary}</Descriptions.Item>
        </Descriptions>
        <div className="trip-list-options">
          <Button onClick={this.handleEdit}>
            <Icon type="edit" />
            Edit
          </Button>
          <Divider type="vertical" />
        </div>
        <TripTable data={this.props.data} />
      </div>
    );
  }
}

export default connect(null, { setCurrentTrip, push })(TripView);

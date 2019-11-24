import { Button, Descriptions, Divider, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import moment from "moment";

import TripTable from "../../components/TripTable";
import { setCurrentTrip, deleteTrip } from "../../actions";

class TripView extends Component {
  handleEdit = () => {
    this.props.setCurrentTrip(this.props.data);
    this.props.push("/");
  };
  handleDelete = () => {
    this.props.deleteTrip(this.props.data);
  };
  render() {
    const { name, summary, date } = this.props.data;
    return (
      <div className="trip-view-container">
        <Descriptions title="Trip Info">
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Summary">{summary}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {date ? moment(date).format("MMM DD, YYYY") : null}
          </Descriptions.Item>
        </Descriptions>
        <div className="trip-list-options">
          <Button onClick={this.handleDelete}>Delete</Button>
          <Divider type="vertical" />
          <Button onClick={this.handleEdit}>
            <Icon type="edit" />
            Edit
          </Button>
        </div>
        <TripTable data={this.props.data} />
      </div>
    );
  }
}

export default connect(null, { setCurrentTrip, deleteTrip, push })(TripView);

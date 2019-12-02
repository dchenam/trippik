import { Card, Descriptions, Icon } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import TripTable from "./TripTable";

export default class TripView extends Component {
  render() {
    const { trip_id, name, summary, date } = this.props.data;
    const link = `${window.location.host}/trips/${trip_id}`;
    return (
      <div className="trip-view-container">
        <Card bordered={false}>
          <Descriptions title="Trip Info">
            <Descriptions.Item label="Name">{name}</Descriptions.Item>
            <Descriptions.Item label="Summary">{summary}</Descriptions.Item>
            <Descriptions.Item label="Date">
              {date ? moment(date).format("MMM DD, YYYY") : null}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false} style={{ marginBottom: 24 }}>
          <h4>
            <Icon type="link" style={{ marginRight: 10 }} />
            <Link to={`/trips/${trip_id}`}>{link}</Link>
          </h4>
        </Card>
        <Card bordered={false}>
          <TripTable data={this.props.data} />
        </Card>
      </div>
    );
  }
}

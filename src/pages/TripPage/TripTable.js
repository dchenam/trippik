import moment from "moment";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Divider, Pagination, TimePicker, Button } from "antd";

import { deleteEvent, updateEvent } from "./actions";

class TripTable extends Component {
  handleChangeTime(event, value) {
    const time = value ? value.toISOString() : null;
    this.props.updateEvent(event, { time: time });
  }

  convertToMoment(events) {
    return events.map(event => {
      event.time = event.time ? moment(event.time) : null;
      return event;
    });
  }

  renderTable() {
    const format = "HH:mm";
    const { editable } = this.props;
    let { events } = this.props.data;
    events = this.convertToMoment(events);
    const columns = [
      {
        title: "Time",
        key: "time",
        render: event =>
          editable ? (
            <TimePicker
              value={event.time}
              onChange={time => this.handleChangeTime(event, time)}
              format={format}
            />
          ) : (
            <p>{event.time ? event.time.format("ddd, h:mmA") : null}</p>
          )
      },
      {
        title: "Name",
        render: ({ place }) => (
          <Link to={`/places/${place.place_id}`}>{place.name}</Link>
        )
      },
      {
        title: "Description",
        dataIndex: "place.description"
      },
      {
        title: "Tag",
        key: "tag"
      },
      {
        title: "Action",
        render: event => (
          <span>
            <Link to={`/places/${event.place.place_id}`}>Explore</Link>
            <Divider type="vertical" />
            {editable ? (
              <Button onClick={() => this.props.deleteEvent(event)}>
                Delete
              </Button>
            ) : null}
          </span>
        )
      }
    ];

    return (
      <Table
        columns={columns}
        dataSource={events}
        pagination={
          <Pagination
            onChange={() => {
              console.log("clicked");
            }}
          />
        }
        rowKey={event => event.event_id}
      ></Table>
    );
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default connect(null, { deleteEvent, updateEvent })(TripTable);

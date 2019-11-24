import { Button, Divider, Icon, Pagination, Table, TimePicker } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { deleteEvent, updateEvent } from "../editor/actions";

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
    const format = "h:mm a";
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
              use12Hours
            />
          ) : (
            <p>{event.time ? event.time.format("h:mmA") : null}</p>
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
            <Button>
              <Link to={`/places/${event.place.place_id}`}>Explore</Link>
            </Button>
            <Divider type="vertical" />
            {editable ? (
              <Icon
                type="close"
                onClick={() => this.props.deleteEvent(event)}
              />
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

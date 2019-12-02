import { Button, Divider, Icon, Table, TimePicker } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent, updateEvent } from "../editor/actions";

class TripTable extends Component {
  handleChangeTime(event, value) {
    const time = value ? value.format("HH:mm[:ss]") : null;
    this.props.updateEvent(event, { time: time });
  }

  convertToMoment(events) {
    return events.map(event => {
      if (event.time) {
        if (event.time.isValid) {
          return event;
        }
        event.time = moment(`2019-01-01 ${event.time}`);
      } else {
        event.time = null;
      }
      return event;
    });
  }

  renderTable() {
    const format = "h:mm A";
    const { editable } = this.props;
    const events = this.convertToMoment(this.props.data.events);

    const columns = [
      {
        title: "Time",
        key: "time",
        sorter: (a, b) => a.time - b.time,
        sortDirections: ["descend", "ascend"],
        render: event =>
          editable ? (
            <TimePicker
              value={event.time}
              onChange={time => this.handleChangeTime(event, time)}
              format={format}
              use12Hours
            />
          ) : (
            <p>{event.time ? event.time.format("h:mm A") : null}</p>
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
        title: "Address",
        dataIndex:  "place.location.display_address"
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
        pagination={false}
        rowKey={event => event.event_id}
      ></Table>
    );
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default connect(null, { deleteEvent, updateEvent })(TripTable);

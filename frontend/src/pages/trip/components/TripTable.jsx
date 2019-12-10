import { Button, Icon, Table, TimePicker } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteEvent, updateEvent } from '../editor/actions';

class TripTable extends Component {
  handleChangeTime(event, value) {
    const time = value ? value.format('HH:mm[:ss]') : null;
    this.props.updateEvent(event, { time });
  }

  renderTable() {
    const convertToMoment = events =>
      events.map(event => {
        const newEvent = Object.assign({}, event);
        if (event.time) {
          if (event.time.isValid) {
            return newEvent;
          }
          newEvent.time = moment(`2019-01-01 ${event.time}`);
        } else {
          newEvent.time = null;
        }
        return newEvent;
      });
    const format = 'h:mm A';
    const { editable } = this.props;
    const events = convertToMoment(this.props.data.events);

    const columns = [
      {
        title: 'Time',
        key: 'time',
        sorter: (a, b) => a.time - b.time,
        sortDirections: ['descend', 'ascend'],
        // eslint-disable-next-line no-confusing-arrow
        render: event =>
          editable ? (
            <TimePicker
              value={event.time}
              onChange={time => this.handleChangeTime(event, time)}
              format={format}
              use12Hours
            />
          ) : (
            <p>{event.time ? event.time.format('h:mm A') : null}</p>
          ),
      },
      {
        title: 'Name',
        render: ({ place }) => <Link to={`/places/${place.placeId}`}>{place.name}</Link>,
      },
      {
        title: 'Description',
        dataIndex: 'place.description',
      },
      {
        title: 'Address',
        dataIndex: 'place.location.displayAddress',
      },
      {
        title: 'Action',
        render: event => (
          <span>
            {editable ? (
              <Icon type="close" onClick={() => this.props.deleteEvent(event)} />
            ) : (
              <Button>
                <Link to={`/places/${event.place.placeId}`}>Explore</Link>
              </Button>
            )}
          </span>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={events}
        pagination={false}
        rowKey={event => event.eventId}
      ></Table>
    );
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default connect(null, { deleteEvent, updateEvent })(TripTable);

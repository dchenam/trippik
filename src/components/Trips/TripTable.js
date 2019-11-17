import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Divider,
  Pagination,
  TimePicker,
  Button,
  Descriptions
} from "antd";

function handleChangeTime(value) {
  console.log(value);
}

export default function TripTable(props) {
  const format = "HH:mm";
  const { summary, events } = props.data;
  const columns = [
    {
      title: "Time",
      key: "time",
      render: ({ time }) => (
        <TimePicker
          onChange={time => handleChangeTime(time)}
          format={format}
        ></TimePicker>
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
          <Button onClick={() => props.onDeleteEvent(event)}>Delete</Button>
        </span>
      )
    }
  ];

  return (
    <div>
      <Descriptions title="Trip Info">
        <Descriptions.Item label="summary">{summary}</Descriptions.Item>
      </Descriptions>
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
    </div>
  );
}

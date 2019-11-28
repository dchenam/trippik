import { Button, Pagination, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function PlaceTable(props) {
  const columns = [
    {
      title: "Name",
      key: "name",
      render: place => (
        <Link to={`/places/${place.place_id}`}>{place.name}</Link>
      )
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Action",
      key: "action",
      render: place => (
        <span>
          <Button onClick={() => props.onAddEvent(place)}>Add</Button>
        </span>
      )
    }
  ];
  return (
    <Table
      columns={columns}
      dataSource={props.data}
      pagination={<Pagination total="4"></Pagination>}
      rowKey="place_id"
    />
  );
}

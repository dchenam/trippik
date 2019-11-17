import React from "react";
import { Link } from "react-router-dom";
import { Table, Pagination, Button } from "antd";

export default function PlaceTable(props) {
  const columns = [
    {
      title: "Name",
      key: "name",
      render: item => <Link to={`/places/${item.place_id}`}>{item.name}</Link>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Tag",
      key: "tag"
    },
    {
      title: "Action",
      key: "action",
      render: item => (
        <span>
          <Button onClick={() => props.onAddEvent(item)}>Add</Button>
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

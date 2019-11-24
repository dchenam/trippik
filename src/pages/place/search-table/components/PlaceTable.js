import React from "react";
import { Table, Pagination, Button } from "antd";

export default function PlaceTable(props) {
  const columns = [
    {
      title: "Name",
      key: "name",
      render: item => <div>{item.name}</div>
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

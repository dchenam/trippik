import React from "react";
import { Link } from "react-router-dom";
import { Table, Divider, Pagination } from "antd";

const columns = [
  {
    title: "Name",
    key: "name",
    render: item => <Link to={`/places/${item.id}`}>{item.name}</Link>
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
        <Link to={`/places/${item.id}`}>Explore</Link>
        <Divider type="vertical" />
        <a href="/">Add</a>
      </span>
    )
  }
];

export default function PlaceTable(props) {
  return (
    <Table
      columns={columns}
      dataSource={props.data}
      pagination={<Pagination total="4"></Pagination>}
      rowKey="id"
    ></Table>
  );
}

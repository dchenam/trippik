import { Button, Pagination, Table } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export default function PlaceTable(props) {
  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: place => <Link to={`/places/${place.placeId}`}>{place.name}</Link>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Address',
      dataIndex: 'location.displayAddress',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: place => (
        <span>
          <Button onClick={() => props.onAddEvent(place)}>Add</Button>
        </span>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={props.data}
      pagination={<Pagination total="10"></Pagination>}
      rowKey="placeId"
    />
  );
}

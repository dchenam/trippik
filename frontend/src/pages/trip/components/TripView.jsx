import { Card, Descriptions, Icon } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import TripTable from './TripTable';

export default function TripView(props) {
  const { tripId, name, summary, date } = props.data;
  const link = `${window.location.host}/trips/${tripId}`;
  return (
    <div className="trip-view-container">
      <Card bordered={false}>
        <Descriptions title="Trip Info">
          <Descriptions.Item label="Name">{name}</Descriptions.Item>
          <Descriptions.Item label="Summary">{summary}</Descriptions.Item>
          <Descriptions.Item label="Date">
            {date ? moment(date).format('MMM DD, YYYY') : null}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <h4>
          <Icon type="link" style={{ marginRight: 10 }} />
          <Link to={`/trips/${tripId}`}>{link}</Link>
        </h4>
      </Card>
      <Card bordered={false}>
        <TripTable data={props.data} />
      </Card>
    </div>
  );
}

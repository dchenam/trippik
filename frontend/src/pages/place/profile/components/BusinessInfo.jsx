import { Card, Divider, Empty } from 'antd';
import React from 'react';

const BusinessInfo = ({ data }) => {
  const { name, description } = data;
  return (
    <div>
      <Card>
        <h3>{name}</h3>
        <p>{description}</p>
        <Divider />
        <h4>Pictures</h4>
        <Card>
          <Empty />
        </Card>
      </Card>
    </div>
  );
};

export default BusinessInfo;

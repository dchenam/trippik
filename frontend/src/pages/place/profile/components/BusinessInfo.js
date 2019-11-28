import { Card, Divider } from "antd";
import React from "react";

const BusinessInfo = ({ data }) => {
  const { name, description } = data;
  return (
    <div>
      <Card>
        <h3>{name}</h3>
        <Divider />
        <p>{description}</p>
      </Card>
    </div>
  );
};

export default BusinessInfo;

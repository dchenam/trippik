import React from "react";
import { Divider } from "antd";

const BusinessInfo = ({ place }) => {
  const { name, description } = place;
  return (
    <div>
      {/* <Descriptions>
          <Descriptions.Item>Restaurant Name</Descriptions.Item>
          <Descriptions.Item>Restaurant Description</Descriptions.Item>
        </Descriptions> */}
      <h3>{name}</h3>
      <Divider />
      <p>{description}</p>
    </div>
  );
};

export default BusinessInfo;

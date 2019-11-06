import React from "react";
import { Layout } from "antd";
import Navbar from "../Navbar/Navbar";

function BasicHeader() {
  return (
    <Layout.Header>
      <Navbar />
    </Layout.Header>
  );
}

export default BasicHeader;

import React from "react";
import { Layout } from "antd";
import BasicFooter from "./BasicFooter";
import BasicHeader from "./BasicHeader";
const { Content } = Layout;

export default function BasicLayout(props) {
  return (
    <Layout>
      <BasicHeader />
      <Content>{props.children}</Content>
      <BasicFooter />
    </Layout>
  );
}

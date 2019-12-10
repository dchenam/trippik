import { Layout } from 'antd';
import React from 'react';
import Navbar from '../Navbar';

function BasicHeader() {
  return (
    <Layout.Header>
      <Navbar />
    </Layout.Header>
  );
}

export default BasicHeader;

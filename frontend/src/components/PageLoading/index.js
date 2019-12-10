import { Spin } from 'antd';
import React from 'react';

export default function PageLoading() {
  return (
    <div className="spinner">
      <Spin size="large" />
    </div>
  );
}

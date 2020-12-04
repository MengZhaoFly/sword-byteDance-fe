import { Tag } from 'antd';
import React, { Component } from 'react';
import { Tag } from 'antd';
import { renderRoutes } from 'react-router-config';

function BitOperation(props) {
  return (
    <div>
      <Tag color="magenta">数学</Tag>
      { renderRoutes(props.route.routes) }
    </div>
  )
}
 
export default BitOperation;
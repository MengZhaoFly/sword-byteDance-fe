import React, { Component } from 'react';
import { Tag } from 'antd';
import { renderRoutes } from 'react-router-config';
function Algorithm(props) {
  return (
    <div>
      <Tag color="magenta">树</Tag>
      { renderRoutes(props.route.routes) }
    </div>
  )
}
 
export default Algorithm;
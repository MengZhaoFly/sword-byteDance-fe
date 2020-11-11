import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
function BitOperation(props) {
  return (
    <div>
      位运算
      { renderRoutes(props.route.routes) }
    </div>
  )
}
 
export default BitOperation;
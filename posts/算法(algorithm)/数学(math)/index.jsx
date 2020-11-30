import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
function BitOperation(props) {
  return (
    <div>
      数学
      { renderRoutes(props.route.routes) }
    </div>
  )
}
 
export default BitOperation;
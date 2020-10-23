import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
function Algorithm(props) {
  return (
    <div>
      数组
      { renderRoutes(props.route.routes) }
    </div>
  )
}
 
export default Algorithm;
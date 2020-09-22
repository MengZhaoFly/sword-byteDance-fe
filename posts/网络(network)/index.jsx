import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
function NetWork(props) {
  return (
    <div>
      { renderRoutes(props.route.routes) }
    </div>
  )
}
 
export default NetWork;
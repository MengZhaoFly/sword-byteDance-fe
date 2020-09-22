import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
function Css(props) {
  return (
    <div>
      { renderRoutes(props.route.routes) }
    </div>
  )
}
 
export default Css;
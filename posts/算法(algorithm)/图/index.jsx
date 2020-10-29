import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
function Graph(props) {
  return (
    <div>
      图
      { renderRoutes(props.route.routes) }
    </div>
  )
}
 
export default Graph;
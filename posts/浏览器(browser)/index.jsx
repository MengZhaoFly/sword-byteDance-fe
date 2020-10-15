import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
function Browser(props) {
  return (
    <div>
      浏览器
      { renderRoutes(props.route.routes) }
    </div>
  )
}
 
export default Browser;
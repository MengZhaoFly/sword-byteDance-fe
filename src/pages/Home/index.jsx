import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../Routes.tpl';

function Home(props) {
  console.log(routes);
  const renderMenu = (node) => {
    if (!node) return;
    return node.map((r, i) => {
      if (r.routes) {
        return (<ul key={i}>
          { r.routeName}:
          { renderMenu(r.routes) }
        </ul>)
      }
      return (
        <li key={i}>
          <Link to={r.path}>{r.routeName}</Link>
        </li>
      )
    })
  }
  return (
    <>
      { renderMenu(routes[0].routes[1].routes) }
    </>
  );
}

Home.loadData = function () {
  return Promise.resolve();
}

// export default withStyles(styles)(Home);
export default (Home);
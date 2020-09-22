import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import routes from '../Routes.tpl';

function App() {
  return (
    <BrowserRouter>
      <div>
        {renderRoutes(routes)}
      </div>
    </BrowserRouter>
  );
}

window.main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(<App />, document.getElementById('root'));
  });
};

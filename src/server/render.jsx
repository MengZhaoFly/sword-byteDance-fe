import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

const stats = require('../../public/react-loadable.json');

export default (req, routes, context) => {
  // @loadable config
  console.log('req.path', req.path);
  const modules = [];
  function App() {
    return (
      <StaticRouter location={req.path} context={context}>
        <div>
          {renderRoutes(routes)}
        </div>
      </StaticRouter>
    );
  }
  const content = renderToString(
    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
      <App />
    </Loadable.Capture>,
  );
  const helmet = Helmet.renderStatic();
  const bundles = getBundles(stats, modules);
  const styles = bundles.filter((bundle) => bundle.file.endsWith('.css'));
  const scripts = bundles.filter((bundle) => bundle.file.endsWith('.js'));
  console.log(bundles, styles, scripts);
  const scriptsTag = scripts
    .map((script) => `<script src="/${script.file}"></script>`)
    .join('\n');
  // ${helmet.title.toString()} ${helmet.meta.toString()}
  const htmlTplPath = path.resolve(__dirname, '../public/index.html');
  let htmlTpl = fs.readFileSync(htmlTplPath, 'utf-8');
  htmlTpl = htmlTpl
    .replace('<!-- helmet.title -->', helmet.title.toString())
    .replace('<!-- helmet.meta -->', helmet.meta.toString())
    .replace('<!-- injectHtml -->', content)
    .replace('<!-- injectScript -->', scriptsTag);

  return htmlTpl;
};

import express from 'express';
import { matchRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import routes from '../Routes.tpl';
import render from './render';

const app = express();
app.use(express.static('public', { index: false }));

app.get('*', (req, res) => {
  if (req.url === '/favicon.ico') {
    res.end('');
    return;
  }
  const promises = [];
  const matchedRouters = matchRoutes(routes, req.path);
  matchedRouters.forEach((mRouter) => {
    if (mRouter.route.loadData) {
      const promise = new Promise((resolve) => {
        mRouter.route.loadData()
          .then(resolve)
          .catch(resolve);
      });
      promises.push(promise);
    }
  });

  Promise.all(promises).then(() => {
    const context = {};
    const renderHtml = render(req, routes, context);
    // 如果 访问了 需要权限的页面   加载了 <Redirect /> 那么react-router 会加一个 action：REPLACE
    // 如果 访问不存在的路由 我们在组件里面 添加了 notFound 属性， 说明渲染到了 404 页面
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.statusCode = 404;
    }
    res.send(renderHtml);
  })
    .catch((err) => {
      console.error(err);
      res.end('sorry, we make a mistake');
    });
});

Loadable.preloadAll().then(() => {
  app.listen(3001, () => {
    console.log('Running on http://localhost:3001/');
  });
}).catch((err) => {
  console.log(err);
});

import React from 'react';
import { Route } from 'react-router-dom';
import loadable from 'react-loadable';
import Home from './pages/Home/index.jsx';
import Post from '../posts/index';
import NotFound from './pages/404/index';
import Layout from './Layout';
// https://loadable-components.com/docs/server-side-rendering/
// 当我加载显示HOME组件之前，我希望调用Home.loadData方法，提前获取到必要的异步数据
// 然后再做服务器端渲染，把页面返回给用户
// loadable(() => import('./OtherComponent'))
function Loading() {
  return (
    <div>loading ... </div>
  )
}

export default [
  {
    path: '/',
    component: Layout,
    loadData: Layout.loadData,
    routes: [
      {
        path: '/',
        component: Home,
        loadData: Home.loadData,
        exact: true,
      },
      {
        path: '/posts',
        component: Post,
        // injectRouteHere
      },
      {
        component: NotFound
      }
    ]
  },
];
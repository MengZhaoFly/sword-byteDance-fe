import React, { Component, createContext } from 'react';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import { renderRoutes } from 'react-router-config';
import Header from './Components/Header/Header';

Sentry.init({
  dsn: 'https://86177b3e03f34d51ab4e2accc8a64d56@o449970.ingest.sentry.io/5433878',
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  // eslint-disable-next-line
  environment: ENV,
  tracesSampleRate: 1.0,
});

const SiteContext = createContext({});
/**
 * 路由 / 入口文件
 * 这里 做的主要是
 * 1. 页面的 Layout 功能
 * 2. 渲染当前路径下面的 子路由
 */
const RESPONSIVE_MOBILE = 768;
class Layout extends Component {
  static loadData() {
    return Promise.resolve();
  }

  state = {
    isMobile: false,
  }

  componentDidMount() {
    this.updateMobileMode();
    window.addEventListener('resize', this.updateMobileMode);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMobileMode);
  }

  updateMobileMode = () => {
    const { isMobile } = this.state;
    const newIsMobile = window.innerWidth < RESPONSIVE_MOBILE;
    if (isMobile !== newIsMobile) {
      this.setState({
        isMobile: newIsMobile,
      });
    }
  };

  render() {
    const { props } = this;
    const { isMobile } = this.state;
    return (
      <SiteContext.Provider value={{ isMobile }}>
        <Header />
        { renderRoutes(props.route.routes) }
      </SiteContext.Provider>
    );
  }
}

export default Layout;

export {
  SiteContext,
};

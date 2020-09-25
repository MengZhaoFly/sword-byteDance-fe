import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Menu, Row } from 'antd';
import styles from './header.less';

const navigation = [
  // {
  //   content: '关于',
  //   path: '/about'
  // },
  {
    content: '归档',
    path: '/'
  }
];

function Header() {
  const colProps = [
    {
      xxl: 4,
      xl: 5,
      lg: 6,
      md: 6,
      sm: 24,
      xs: 24, // 小屏幕 logo 全占满
    },
    {
      xxl: 20,
      xl: 19,
      lg: 18,
      md: 18,
      sm: 0,
      xs: 0, // 小屏幕 导航消失
    }
  ];
  const navigationNode = (
    <Menu mode="horizontal">
      {
        navigation.map((nav, i) => (
          <Menu.Item key={i}>
            <Link to={nav.path}>{ nav.content }</Link>
          </Menu.Item>
        ))
      }
      <Menu.Item>
        <a href="https://github.com/MengZhaoFly/sword-byteDance-fe" target="_blank">github</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <header id="header" className={styles.header}>
      <Row>
        <Col {...colProps[0]}>
          <div className={styles.logo}>
            <Link to="/">剑指前端offer</Link>
          </div>
        </Col>
        <Col {...colProps[1]}>
          {navigationNode}
        </Col>
      </Row>
    </header>
  );
}
export default (Header);

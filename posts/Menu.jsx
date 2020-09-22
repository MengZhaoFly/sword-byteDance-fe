import React from 'react';
import { Menu, Switch, Divider } from 'antd';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
function SiteMenu(props) {
  const routes = props.routes;
  const renderMenu = (node) => {
    return node.map((r, i) => {
      if (r.routes) {
        return (<SubMenu key={i} title={<Link to={r.path}>{r.routeName}</Link>}>
          { renderMenu(r.routes) }
        </SubMenu>)
      }
      return (
        <Menu.Item key={i}>
          <Link to={r.path}>{r.routeName}</Link>
        </Menu.Item>
      )
    })
  }
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      { renderMenu(routes) }
    </Menu>
  )
}

export default SiteMenu;
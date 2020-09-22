import React, { useContext, useState } from 'react';
import { Row, Col, Drawer, Button } from 'antd';
import { renderRoutes } from 'react-router-config'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import SiteMenu from './Menu';
import { SiteContext } from '../src/Layout';
import styles from './index.less';


function Posts(props) {
  const { isMobile } = useContext(SiteContext);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Row>
        {
          isMobile
            ? (
              <>
                <Drawer
                  title="文章总览"
                  closeIcon={<MenuFoldOutlined />}
                  visible={visible}
                  onClose={() => setVisible(false)}
                  placement="left">
                  <SiteMenu routes={props.route.routes} />
                </Drawer>
                <Button type="primary" onClick={() => setVisible(true)}>
                  <MenuUnfoldOutlined />
                </Button>
              </>
            )
            : (
              <Col xxl={4} xl={5} lg={6} md={6} sm={0} xs={0} className="main-menu">
                <SiteMenu routes={props.route.routes} />
              </Col>
            )
        }
        <Col xxl={20} xl={19} lg={18} md={18} sm={24} xs={24}>
          <div className={isMobile ? styles.mobile : styles.main}>
            {renderRoutes(props.route.routes)}
          </div>
        </Col>
      </Row>
    </>
  );
}

Posts.loadData = function () {
  return Promise.resolve();
}

export default (Posts);
import React from "react";
import { Layout } from "antd";
const { Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout className="appLayout">
      <Content className="contentBody">
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center", width: '100%' }}>
        News Aggregator ©2024 Created by Zahid-Mahmood
      </Footer>
    </Layout>
  );
};

export default AppLayout;

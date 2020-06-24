import React, { useState } from "react";
import { Button, Layout, Drawer, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;
const AppLayout = () => {
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    console.log("onClose");
    setVisible(false);
  };

  const menus = [
    { name: "home", url: "/home" },
    { name: "about", url: "/about" },
    { name: "login", url: "/login" },
  ];

  const renderMenus = menus.map((menu, idx) => (
    <Menu.Item key={idx}>
      <Link to={menu.url}>{menu.name}</Link>
    </Menu.Item>
  ));

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
        {renderMenus}
      </Menu>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={["0"]}>
          {renderMenus}
        </Menu>
      </Drawer>
    </Header>
  );
};

export default AppLayout;

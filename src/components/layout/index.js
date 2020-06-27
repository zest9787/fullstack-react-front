import React, {useCallback, useState} from "react";
import {Button, Drawer, Layout} from "antd";
import {Link} from "react-router-dom";
import Utils from "../utils";
import "bootstrap/dist/css/bootstrap.min.css";
import {Justify} from "react-bootstrap-icons";

const {Header} = Layout;
const AppLayout = ({children}) => {
    const [visible, setVisible] = useState(false);
    const screen = Utils.WindowSize();
    const onClose = () => {
        console.log("onClose");
        setVisible(false);
    };

    const menus = [
        {name: "home", url: "/home"},
        {name: "about", url: "/about"},
    ];
    const renderMenus = useCallback(
        () =>
            menus.map((menu, idx) => (
                <li className="nav-item" key={idx}>
                    <Link to={menu.url} className="nav-link">
                        {menu.name}
                    </Link>
                </li>
            )),
        [menus]
    );

    return (
        <>
            <Drawer
                title="Basic Drawer"
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <ul style={{listStyle: 'none', padding: 0}}>
                    {renderMenus()}
                </ul>
            </Drawer>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                {screen.width < 768 && (
                    <Button
                        className="navbar-brand"
                        size="large"
                        onClick={() => setVisible(true)}
                        ghost
                    >
                        <Justify size={20}/>
                    </Button>
                )}
                <Link to={"/home"} className="navbar-brand">
                    FullStack
                </Link>
                <div className="navbar-nav mr-auto">{renderMenus()}</div>
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/logout" className="nav-link">
                            LogOut
                        </Link>
                    </li>
                </div>
            </nav>
            <div
                style={{
                    padding: screen.width < 768 ? "0" : "5px 15px",
                }}
            >
                {children}
            </div>
        </>
    );
};

export default AppLayout;

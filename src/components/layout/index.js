import React, {lazy, useCallback, useState} from "react";
import {Button, Drawer, Layout, Tabs} from "antd";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Justify} from "react-bootstrap-icons";
import Utils from "../utils";
import "bootstrap/dist/css/bootstrap.min.css";
import {addMenu, tabChange} from "../../redux/common/commonAction";

const {Header} = Layout;
const {TabPane} = Tabs;
const AppLayout = ({children}) => {
    const [visible, setVisible] = useState(false);
    // const [activeKey, setActiveKey] = useState(0);
    const dispatch = useDispatch();
    const screen = Utils.WindowSize();
    const onClose = () => {
        console.log("onClose");
        setVisible(false);
    };
    const {tabMenus, activeKey} = useSelector(state => state.common);
    console.log('tabMenus : ', tabMenus);
    const menus = [
        {id: '1', name: "home", url: "/home"},
        {id: '2', name: "about", url: "/about"},
    ];
    const renderMenus = useCallback(
        () =>
            menus.map((menu, idx) => {
                // menu['component'] = lazy(() =>import(`views/${menu.url.substring(1)}`).catch(() => import("views/notfound")));

                return (
                <li className="nav-item" key={idx}>
                    <Link to={menu.url} onClick={() => dispatch(addMenu(menu))} style={{cursor:'pointer'}} className="nav-link">
                        {menu.name}
                    </Link>
                </li>
            )}),
        [menus]
    );

    const onTabChange = (key) => {
        dispatch(tabChange(key));
    }
    const onTabEdit = () => {

    }

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
                <Tabs type="editable-card"
                      onChange={onTabChange}
                      activeKey={activeKey}
                      onEdit={onTabEdit}>
                    {tabMenus.map(menu => {
                        const RenderComponent = lazy(
                            () =>
                                new Promise((resolve, reject) =>
                                    setTimeout(() => resolve(import(`views/${menu.url.substring(1)}`).catch(() => import("views/notfound"))), 100)
                                )
                        );
                        return (
                            <TabPane tab={menu.url} key={menu.id} closable={true}>
                                <RenderComponent/>
                            </TabPane>
                        )
                    })};
                </Tabs>
            </div>
        </>
    );
};

export default AppLayout;

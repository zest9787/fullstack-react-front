import React, {useCallback, useState} from "react";
import {Button, Drawer, Layout} from "antd";
import {Link} from "react-router-dom";
import Utils from "../utils";
import "bootstrap/dist/css/bootstrap.min.css";
import {Justify} from "react-bootstrap-icons";

const {Header} = Layout;
const AppLayout = ({children}) => {
    //const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const {userInfo} = useSelector(state => state.user);
    const {visible, tabMenus, activeKey} = useSelector(state => state.common);
    const screen = Utils.WindowSize();
    const toggleMenu = () => {
      dispatch(toggleDrawer());
    }
    const logoutProcess = () => {
      dispatch(logout());
      window.location.href = '/';
    }
    const menus = [
        {name: "home", url: "/home"},
        {name: "about", url: "/about"},
    ];
    const addTabMenu = (menu) => {
      const RenderComponent = lazy(() => 
        new Promise((resove, reject) => 
          setTimeout(() => resolve(import(`views/${menu.url.substring(1)}`).catch(() => {
            return import('views/notfound')
          })), 100)
        ));
      menu['content'] = <RenterComponent/>;
      dispatch(addMenu(menu));
    }
    const renderMenus = useCallback(
        () =>
            menus.map((menu, idx) => (
                <li className="nav-item" key={idx}>
                    <Link to={menu.url} onClick={() => addTabMenu(menu)} style={{cursor:'pointer'}} className="nav-link">
                        {menu.name}
                    </Link>
                </li>
            )),
        [menus]
    );

    const onTabChange = (key) => {
      dispatch(tabChange(key));
    }

    const onTabEdit = (target, action) => {
      dispatch(removeMenu(target));
    }

    useEffect(() => {
      if (location.pathname !== '/') {
        let loadMenu = menus.find(menu => menu.url === location.pathname);
        if (loadMenu === undefined) loadMenu. {id: 'notfound', url: location.pathname, name: 'Not Found'}
        addTabMenu(loadMenu);
      }
    });
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
                        <Link to="/logout" onClick={logoutProcess} className="nav-link">
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
                {tabMenus.length > 0 ?
                <Tabs type='editable-card' onChange={onTabChange} activeKey={activeKey}
                      onEdit={onEdit} hideAdd>
                  {tabMenus.map(menu => {
                    return (<TabPane tab={menu.name} key={menu.id} cloasable={true}>{menu.content}</TabPane>);
                    })};
                </Tabs>: <Main/>}
            </div>
        </>
    );
};

export default memo(AppLayout);

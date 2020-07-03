import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from 'react-redux';
import AppLayout from "../layout";

const AuthRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const {isLoggedIn} = useSelector(state => state.user === undefined ? {isLoggedIn: false} : state.user);
  if (!isLoggedIn) return <Redirect to={"/login"} />;
  return (
    <>
      <AppLayout>
        <Route path={location.pathname} component={Component} {...rest} />
      </AppLayout>
    </>
  );
};

export default AuthRoute;

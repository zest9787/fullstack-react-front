import React from "react";
import {Redirect, Route} from "react-router-dom";
import {useSelector} from 'react-redux';
import AppLayout from "../layout";

const AuthRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  if (!isLoggedIn) return <Redirect to={"/login"} />;
  return (
    <>
      <AppLayout>
        <Route component={Component} {...rest} />
      </AppLayout>
    </>
  );
};

export default AuthRoute;

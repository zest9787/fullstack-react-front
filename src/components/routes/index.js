import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import AppLayout from "../layout";
import { loginSuccess } from "../../redux/user/action";

const AuthRoute = ({ component: Component, ...rest }) => {
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const localUserInfo = localStorage.getItem("userInfo");
  let isLoggedIn = true;
  if (!localUserInfo) isLoggedIn = false;
  if (!isLoggedIn) return <Redirect to={"/login"} />;
  console.log('localUserInfo : ', localUserInfo);
  // const userInfo = JSON.parse(localUserInfo);
  // console.log('userInfo : ', userInfo);
  // localUserInfo["token"] = localStorage.getItem("token");
  dispatch(loginSuccess(localUserInfo));
  return (
    <>
      <AppLayout>
        <Route component={Component} {...rest} />
      </AppLayout>
    </>
  );
};

export default AuthRoute;

import React, { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import * as functions from "./components/common/functions";
import AuthRoute from "./components/routes";
import "./App.css";

const Login = lazy(() => import("./views/login"));
const NotFound = lazy(() => import("./views/notfound"));

function App() {
  const match = useLocation();

  const RenderComponent = lazy(() =>
    match.pathname === "/"
      ? import("./views/home")
      : import(`./views/${match.pathname.substring(1)}`).catch(() =>
          import("./views/notfound")
        )
  );

  return (
    <Suspense fallback={functions.loadingDiv()}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <AuthRoute path={match.pathname} component={RenderComponent} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default App;

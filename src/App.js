import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import * as functions from "./components/common/functions";
import "./App.css";
import AppLayout from "./components/layout";

const Login = lazy(() => import("./views/login"));
const Home = lazy(() => import("./views/home"));
const About = lazy(() => import("./views/about"));
const NotFound = lazy(() => import("./views/notfound"));

function App() {
  return (
    <Suspense fallback={functions.loadingDiv()}>
      <AppLayout />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path={["/", "/index", "/home"]} exact component={Home} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./views/login";
import Home from "./views/home";
import About from "./views/about";
import NotFound from "./views/notfound";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path={['/', '/index', '/home']} exact component={Home} />
      <Route path='/about' component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;

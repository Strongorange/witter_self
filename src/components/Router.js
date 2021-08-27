import React from "react";
import {
  useUser,
  useSetUser,
  useIsLoggedIn,
  useSetIsLoggedIn,
} from "../context";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import PageNotFound from "./PageNotFound";
import Navigation from "./Navigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Navigation />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/profile" exact>
                <Profile />
              </Route>
              <Route component={PageNotFound} />
            </Switch>
          </>
        ) : (
          <>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route component={PageNotFound} />
            </Switch>
          </>
        )}
      </Switch>
    </Router>
  );
};

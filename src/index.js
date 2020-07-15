/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Manager from "layouts/Manager.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import Login from "views/Login/Login";

import { Provider } from "react-redux";
import configureStore from "./configureStore";

import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const store = configureStore();
const hist = createBrowserHistory();

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
    <ProtectedRoute
        path="/admin"
        component={Admin}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        path="/manager"
        component={Manager}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/* <Route path="/admin" component={Admin} />
      <Route path="/manager" component={Manager} /> */}
      <Route path="/auth" component={Login} />
      <Redirect from="/" to="/admin" />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

const _App = connect(mapStateToProps)(App)

ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <_App></_App>
  </Router>
  </Provider>,
  document.getElementById("root")
);

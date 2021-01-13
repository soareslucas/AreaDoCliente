import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Consulta from "./pages/Consulta";
import Login from "./pages/Login";
import App from './app';
import AuthenticatedRoute from './AuthenticatedRoute'

const Routes = () => (
  <BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
		<Route path="/logout" component={App} />
		<AuthenticatedRoute path="/admin" exact component={Admin} />
        <Route path="/consulta" component={Consulta} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>




);

export default Routes;
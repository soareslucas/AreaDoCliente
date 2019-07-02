import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Consulta from "./pages/Consulta";


import App from './app';
//import { isAuthenticated } from "./services/auth";


const Routes = () => (
  <BrowserRouter>
    <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/signup" component={SignUp} />
        <Route path="/admin" component={Admin} />
        <Route path="/consulta" component={Consulta} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>




);

export default Routes;
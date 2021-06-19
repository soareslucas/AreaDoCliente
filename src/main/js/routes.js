import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import LoginCliente from "./pages/LoginCliente";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import Planos from "./pages/Planos";
import Seguimentos from "./pages/Seguimentos";
import Clientes from "./pages/Clientes";
import Pagamentos from "./pages/Pagamentos";


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
        <Route path="/cliente" component={LoginCliente} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/planos" component={Planos} />
        <Route path="/seguimentos" component={Seguimentos} />
        <Route path="/clientes" component={Clientes} />
        <Route path="/pagamentos" component={Pagamentos} />



      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>




);

export default Routes;
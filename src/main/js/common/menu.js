



import React, { Component, ReactComponent } from "react";
import { Link } from "react-router-dom";
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Nav = require("react-bootstrap/Nav")
const Badge = require("react-bootstrap/Badge")

import AuthenticationService from '../service/AuthenticationService';



class Menu extends Component {
	constructor(props) {
		super(props);
		this.children = { validated: false };    
		this.state = { logado: AuthenticationService.isUserLoggedIn()}

	}

  render() {
    return (

        <>


        <aside className="control-sidebar control-sidebar-dark">
        {/* Control sidebar content goes here */}
        <div className="p-3">
            <h5>Menu do Admin</h5>
            <p> <Link to="/admin" >  Login   </Link> </p>
            <p> {this.state.logado ? <Link to="/admin" onClick={AuthenticationService.logout} > <i className="fas fa-reply"></i> Logout   </Link>   : ''} </p>

        </div>
        </aside>

      

        </>



    );
  }
}


export default Menu;


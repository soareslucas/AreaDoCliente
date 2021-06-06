import React, { Component, ReactComponent } from "react";
import { Link } from "react-router-dom";
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Nav = require("react-bootstrap/Nav")
const Badge = require("react-bootstrap/Badge")

import Header from './header';
import Menu from './menu';
import Content from './content';
import Footer from './footer';
import SideBar from './sidebar';




import AuthenticationService from '../service/AuthenticationService';



class Wrapper extends Component {
	constructor(props) {
		super(props);
		this.children = { validated: false };    
		this.state = { logado: AuthenticationService.isUserLoggedIn()}

	}

  render() {
    return (

        <div className="wrapper">

            <Header/>

            <Menu/>

            <SideBar/>


            <div className="content-wrapper">

                {this.props.children}

            </div>

            <Footer/>


        </div>






    );
  }
}


export default Wrapper;






import React, { Component, ReactComponent } from "react";
import { Link } from "react-router-dom";
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Nav = require("react-bootstrap/Nav")
const Badge = require("react-bootstrap/Badge")

import AuthenticationService from './service/AuthenticationService';



class Header extends Component {
	constructor(props) {
		super(props);
		this.children = { validated: false };    
		this.state = { logado: AuthenticationService.isUserLoggedIn()}

	}

  render() {
    return (


            <Container>
	            <Row>
	                <Col></Col>
	                <Col xs={12}>
	                    <div className="box box-gray">
	                        <div className="box-header">
	                             <header>
                                    <nav className="navbar barra-superior">
                                        <div className="container">
                                            <Col md="8">
                                                <div className="container">
                                                    <a className="navbar-brand"> <h1>Tribunal de Justiça do Estado de Goiás</h1></a>
                                                </div>
                                            </Col>

                                            <Col md='4'>
                                            
                                            	<h3>
                                            		Sistema de Citações <i className="fas fa-envelope-open-text"></i>
                                            		

                                            	</h3>
                                            		
                                                <Row>
                                                &nbsp; &nbsp;
                                            	</Row>
                                            	
                                                <Row>
                                                &nbsp; &nbsp;
                                            	</Row>         
                                            	
                                                <Row>
                                                &nbsp; &nbsp;
                                            	</Row>               
                                            	
                                                <Row>
                                                &nbsp; &nbsp;
                                            	</Row>    
                                            	
                                            	<Row>
														<Col md='6'> {this.state.logado ? <Link to="/admin" onClick={AuthenticationService.logout} > <i className="fas fa-reply"></i> Logout   </Link>: ''} </Col>
																									
														<Col md='6'> <Link to="/admin"> <i className="fas fa-user-cog"></i> Admin </Link> </Col>
                                            	</Row>

                                            </Col>
                                        </div> 
                                    </nav>
	                            </header>
	                        </div>
	                        <div className="box-body">                                   
                                {this.props.children}
			                </div>
	                    </div>

	                </Col>
	                <Col>
	                </Col>
	            </Row>
	        </Container>

    );
  }
}


export default Header;

import React, { Component } from "react";
import { Link } from "react-router-dom";
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")


class Header extends Component {
	constructor(props) {
		super(props);
		this.children = { validated: false };    
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
                                            <Col md="4">
                                                <div className="container">
                                                    <a className="navbar-brand"> <h1>Tribunal de Justiça do Estado de Goiás</h1></a>
                                                </div>
                                            </Col>
        
                                            <Col md='8'>
                                                <Row>
                                                    <Col md='10'></Col>
                                                    <Col md='2'> <h3 className="box-title"><Link to="/admin">Admin </Link></h3></Col>
                                                    
                                                    
                                                </Row>
                                                <Row>
                                                    <Col md='2'> </Col>
                                                    <Col md='10'>  <h3 className="box-title">SISTEMA DE PRÉ-CADASTRO ELETRÔNICO TJ GOIÁS – PESSOA JURÍDICA</h3></Col>
                                                   
                                                </Row>
                                            </Col>
                                        </div> 
                                    </nav>
	                            </header>
	                        </div>
	                        <div className="box-body">

                                {/* <ul itemType="https://schema.org/BreadcrumbList" className="breadcrumb">
                                    <li>
                                        <i className="fas fa-home"></i>&nbsp;
                                    </li>


                                    <li  itemType="https://schema.org/ListItem">
                                        <a itemProp="item" className="pathway"><span itemProp="name"> <Link to="/">Início </Link> </span></a>
                                        <span className="divider">&nbsp;» &nbsp;</span>
                                    </li>

                                    <li  itemType="https://schema.org/ListItem">
                                        <a itemProp="item" className="pathway"><span itemProp="name"> <Link to="/Admin"> Admin</Link> </span></a>
                                    </li>


                                
                                </ul> */}
                                   
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

'use strict';
import React, { Component } from "react";
import { Link } from "react-router-dom";
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
import Header from './header';


class Index extends React.Component {
    

	constructor(props) {
		super(props);
	}


	render() {
		return (
            <>


                <div>
                    <div className="info-box">
                        <span className="info-box-icon bg-green">
                            <i className="far fa-star"></i>
                        </span>
                        <div className="info-box-content">
                            <span className="info-box-number"><Link to="/signup">Solicitar Cadastro </Link> </span>
                        </div>
                    </div>

                    <div className="info-box">
                        <span className="info-box-icon bg-yellow">
                            <i className="far fa-flag"></i>
                        </span>
                        <div className="info-box-content">
                            <span className="info-box-number"><Link to="/consulta"> Entre em sua Conta </Link> </span>
                        </div>
                    </div>
                </div>
            </>

		)
	}
}


class App extends Component {


  render() {
    return (
                <Header>
                    
                    <Index/>
                </Header>
    );
  }
}



export default App;


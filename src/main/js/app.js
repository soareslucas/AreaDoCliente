'use strict';
import React, { Component } from "react";
import { Link } from "react-router-dom";
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")

import Header from './common/header';
import Wrapper from './common/wrapper';

import Menu from './common/menu';
import Content from './common/content';
import Footer from './common/footer';
import Breadcrumb from 'react-bootstrap/Breadcrumb'




class Index extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {
        return (

            <div>
	            <Breadcrumb>
		            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
		            <Breadcrumb.Item active href="#">Início</Breadcrumb.Item>
		        </Breadcrumb>
		


                {/* Main content */}
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-header text-right">
                                        <h5 className="m-0">Área dos membros <i className="far fa-flag"> </i> </h5>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title">Acompanhamento</h6>
                                        <p className="card-text">Faça gestão dos serviços contratados e acompanhe o andamento dos projetos solicitados bem como as etapas de execução.</p>

                                        <div className="text-right">                                    
                                            <Link to="/cliente" className="btn btn-primary text-right"> Entre em sua Conta </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* /.col-md-6 */}


                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="m-0">Seja um novo cliente! <i className="far fa-star"></i> </h5>
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title">Análise de perfil</h6>
                                        <p className="card-text"> Informe as prioridades e características do seu negócio e tenha um plano sugerido de acordo com sua necessidade.</p>
                                        <Link to="/signup" className="btn btn-primary">Contratar Serviços</Link>
                                    </div>
                                </div>
                            </div>
                            {/* /.col-md-6 */}


                        </div>
                        {/* /.row */}

                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content */}
            </div>




        )
    }
}


class App extends Component {


    render() {
        return (


            <Wrapper>
                <Index />
            </Wrapper>



        );
    }
}



export default App;


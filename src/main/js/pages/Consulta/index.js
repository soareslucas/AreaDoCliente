import React, { Component } from "react";
import { useState } from 'react';

import MaskedFormControl from 'react-bootstrap-maskedinput';
const ReactDOM = require('react-dom');
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Alert = require("react-bootstrap/Alert")
const Modal = require("react-bootstrap/Modal")


import follow from '../../follow';
import client from '../../client';
import { Link } from "react-router-dom";
import Header from '../../header';
import Breadcrumb from 'react-bootstrap/Breadcrumb'



const root = '/api';

class AppSignUp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {escritorios: [], attributes: [], pageSize: 2, links: {}};
		this.onSearch = this.onSearch.bind(this);
	}

	onSearch(cnpj) {     
			client({
				method: 'GET',
				path: 'api/escritorios/search/findBycnpj?cnpj='+cnpj,
				headers: {'Content-Type': 'application/json'}
			}).then(response =>{ console.log(response)});
	}

	render() {
		return (
			<div>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onSearch}/>
			</div>
		)
	}
}



// tag::create-dialog[]
class CreateDialog extends React.Component {

	
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);    
		this.state = { validated: false, alerta: false};    
	}
	


	handleSubmit(e) {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ validated: true });

		} else{
			e.preventDefault();
			var cnpj = '';

			cnpj = ReactDOM.findDOMNode(this.refs['cnpj']).value.trim();
			this.props.onSearch(cnpj);

			this.setState({ validated: false });
			this.setState({ alerta: true });


		}



	}

	render() {
		const { validated } = this.state;
		const { alerta } = this.state;

		return (

			<div>
			
	            <Breadcrumb>
		            <Breadcrumb.Item href="/">Início</Breadcrumb.Item>
		            <Breadcrumb.Item active href="SignUp">Consulta Andamento</Breadcrumb.Item>
		        </Breadcrumb>
		
		
		
		        <div> 
		            <Alert show={alerta} variant="success">
		                <Alert.Heading>Solicitação realizada com sucesso!</Alert.Heading>
		                <p>
		                    Seu solicitação será analisado pelo gerenciamento de sistemas que fará a aprovação do cadastro. 
		                </p>
		            </Alert>
		
		        </div>

				<Form
					noValidate
					validated={validated}
					onSubmit={e => this.handleSubmit(e)} >

			            <input ref="manager" type="hidden" name="manager" value="" />
						<input ref="status" type="hidden" name="status" value="" />

						{/* <input ref="" type="hidden" name="possuiAdvogado" value="" /> */}

					<Form.Row>
			            
			            
						<Form.Group as={Col} md="6" controlId="1">
		
						</Form.Group>
						<Form.Group as={Col} md="6" controlId="2">
								<Form.Label>CNPJ</Form.Label>
								<div key="cnpj">
									<MaskedFormControl required placeholder="xx.xxx.xxx/xxxx-xx"  ref="cnpj" mask='11.111.111/1111-11' />
									<Form.Control.Feedback type="invalid">
										Por favor escreva o CNPJ da Empresa/Órgão.
									</Form.Control.Feedback>
									
								</div>
						</Form.Group>

					</Form.Row>
					
					
					
					
					<Form.Row>			
						<Form.Group as={Col} md="11" >
						</Form.Group>
						
						<Form.Group as={Col} md="1">
							<Button variant="primary"  type="submit">
							Buscar 
							</Button>
						</Form.Group>
					</Form.Row>

		
					
					
				</Form>
			</div>
		)
	}

}





class Consulta extends Component {


  render() {
    return (
                <Header>
                    <AppSignUp/>
                </Header>
    );
  }
}

export default Consulta;
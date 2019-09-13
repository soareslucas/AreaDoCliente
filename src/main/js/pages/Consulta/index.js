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
const Table = require("react-bootstrap/Table")
const InputGroup = require("react-bootstrap/InputGroup")

import follow from '../../follow';
import client from '../../client';
import { Link } from "react-router-dom";
import Header from '../../header';
import Breadcrumb from 'react-bootstrap/Breadcrumb'


const root = '/api';


class Escritorio extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr>

				<td>{this.props.escritorio.cnpj}</td>
                <td>{this.props.escritorio.nome}</td>
                <td>{this.props.escritorio.status}</td>

			</tr>
		)
	}
}

class EscritorioVazio extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
			</>
		)
	}
}




class EscritorioList extends React.Component {

	constructor(props) {
		super(props);
    }

	render() {
		
		let escritorios;
		
		if(this.props.escritorios != null){			
			 escritorios = this.props.escritorios.map(escritorio =>
				<Escritorio key={escritorio._links.self.href} escritorio={escritorio}/>
			);
		}else{
			
			 escritorios = <EscritorioVazio/>
		
		}
		
		return (
			<div>
				<Table>
					<tbody>
						<tr>
							<th>CNPJ</th>
							<th>Nome do Escritório</th>
							<th>Status</th>
						</tr>
						
						{escritorios}
					</tbody>
				</Table>
			</div>
		)
	}
}


class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);    
		this.state = { validated: false, alerta: false, escritorios: [], sucesso: false, falha: false};    
	}
	
	loadFromServer(cnpj) {
		client({
			method: 'GET',
			path: 'api/escritorios/search/findBycnpj?cnpj='+cnpj,
			headers: {'Content-Type': 'application/json'}
		}).then(escritorioCollection => {
			this.setState({
				escritorios: escritorioCollection.entity._embedded.escritorios});
			return escritorioCollection.entity._embedded.escritorios;
		}).done( escritorios=>{			
			if(escritorios.length == 0){
				this.setState({ falha: true});
				this.setState({ sucesso: false});

			}else{
				this.setState({ falha: false});
				this.setState({ sucesso: true});
			}
		});	
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
			
			this.loadFromServer(cnpj);

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
		        
		        
			    {this.state.falha && <div className="alert alert-warning">Não há solicitação com esse CNPJ!</div>}
			    {this.state.sucesso && <div className="alert alert-success">CNPJ encontrado!</div>}

				<Form
					noValidate
					validated={validated}
					onSubmit={e => this.handleSubmit(e)} >

		            <input ref="manager" type="hidden" name="manager" value="" />
					<input ref="status" type="hidden" name="status" value="" />

					<Form.Row>
			            
			            
						<Form.Group as={Col} md="4" controlId="1">
		
						</Form.Group>
						<Form.Group as={Col} md="7" controlId="2">
								<Form.Label>CNPJ</Form.Label>
								<div key="cnpj">
									<MaskedFormControl required placeholder="xx.xxx.xxx/xxxx-xx"  ref="cnpj" mask='11.111.111/1111-11' />										
								</div>
						</Form.Group>
						
						<Form.Group as={Col} md="1" controlId="2">
							<Form.Label>&nbsp; &nbsp;</Form.Label>
							<div key="botao">
									<Button variant="primary" type="submit">
									    Buscar
									</Button>
							</div>
						</Form.Group>						
												

					</Form.Row>
	
				</Form>

                <EscritorioList escritorios={this.state.escritorios}/>

			</div>
		)
	}

}



class Consulta extends Component {


  render() {
    return (
                <Header>
                    <App/>
                </Header>
    );
  }
}

export default Consulta;
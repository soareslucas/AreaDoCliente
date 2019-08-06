import React, { Component } from "react";
import MaskedFormControl from 'react-bootstrap-maskedinput'
const ReactDOM = require('react-dom');
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Table = require("react-bootstrap/Table")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Modal = require("react-bootstrap/Modal")


import Breadcrumb from 'react-bootstrap/Breadcrumb'
import follow from '../../follow';
import client from '../../client';
import AuthenticationService from '../../service/AuthenticationService';

import Header from '../../header';

import { Link } from "react-router-dom";

const root = '/api';

class AppAdmin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {escritorios: [], attributes: [], pageSize: 50, links: {}};
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);

	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'escritorios', params: {size: pageSize}}]
		).then(escritorioCollection => {
			return client({
				method: 'GET',
				path: escritorioCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return escritorioCollection;
			});
		}).done(escritorioCollection => {
			this.setState({
				escritorios: escritorioCollection.entity._embedded.escritorios,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: escritorioCollection.entity._links});
		});
	}


	onDelete(escritorio) {
		client({method: 'DELETE', path: escritorio._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}
	

	onUpdate(escritorio, updatedEscritorio) {
		client({
			method: 'PUT',
			path: escritorio._links.self.href,
			entity: updatedEscritorio,
			headers: {
				'Content-Type': 'application/json'
			}
		}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}
	
	
	
	

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}

	render() {
		return (
			<div>

				<Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link>


                <Breadcrumb>
                    <Breadcrumb.Item href="/">Início</Breadcrumb.Item>
                    <Breadcrumb.Item active href="Admin">Admin</Breadcrumb.Item>
                </Breadcrumb>

                <EscritorioList escritorios={this.state.escritorios}
                    links={this.state.links}
                    pageSize={this.state.pageSize}
                    onDelete={this.onDelete}
                	onUpdate={this.onUpdate} 
                	attributes={this.state.attributes}
                />
			</div>
		)
	}
}


class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {modal:  false};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let updatedEscritorio = {};
		
		updatedEscritorio = this.props.escritorio;
		updatedEscritorio['status'] = ReactDOM.findDOMNode(this.refs['status']).value.trim();

		
		this.props.onUpdate(this.props.escritorio, updatedEscritorio);
		this.setState({ modal: false })
	}
	
	handleClose(){
		 this.setState({ modal: false });
	}
	
	handleShow(){
		 this.setState({ modal: true });
	}


	render() {

		const dialogId = "updateEscritorio-" + this.props.escritorio._links.self.href;
		const { modal } = this.state;
		
		return (
			<div key={dialogId}>
			
				<Button onClick={this.handleShow}>Detalhes/Atualizar</Button>
				
				<form>
					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Atualizar Status</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="1">
									<Form.Label>CNPJ</Form.Label>
									<h5> {this.props.escritorio['cnpj']} </h5> 			
								</Form.Group>
								<Form.Group as={Col} md="8" controlId="2">
									<Form.Label>Nome do Órgão ou Empresa</Form.Label>
									<h5> {this.props.escritorio['nome']} </h5> 			
								</Form.Group>
							</Form.Row>
						
							<Form.Row>
								<Form.Group as={Col}   md="12" controlId="3">
									<Form.Label>Endereço</Form.Label>
									<h5> {this.props.escritorio['endereco']} </h5> 			
								</Form.Group>
							</Form.Row>
						
							<Form.Row>
								<Form.Group as={Col}  md="6" controlId="4">
									<Form.Label>Nome do Representante Legal</Form.Label>
									<h5> {this.props.escritorio['nomeRepresentante']} </h5> 			
								</Form.Group>
								<Form.Group as={Col}  md="6" controlId="5">
									<Form.Label>Vínculo do Representante Legal</Form.Label>
									<h5> {this.props.escritorio['vinculo']} </h5> 			
								</Form.Group>
							</Form.Row>
									
							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="1">
									<Form.Label>CPF do Representante Legal</Form.Label>
									<h5> {this.props.escritorio['cpf']} </h5> 			
								</Form.Group>
						
								<Form.Group as={Col}  md="4" controlId="6">
									<Form.Label>Telefone</Form.Label>
									<h5> {this.props.escritorio['telefone']} </h5> 			
								</Form.Group>
						
								<Form.Group as={Col}   md="4" controlId="7">
									<Form.Label>Celular</Form.Label>
									<h5> {this.props.escritorio['celular']} </h5> 			
								</Form.Group>
							</Form.Row>
							
							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="formGridEmail">
									<Form.Label>E-mail</Form.Label>
									<h5> {this.props.escritorio['email']} </h5> 			
								</Form.Group>
								
								
								<Form.Group as={Col}  md="4">
									<Form.Label> Arquivo Comprobatório </Form.Label>
									<h5>
										<a href={'/downloadFile/'+this.props.escritorio['id'] }> Download Arquivo </a>
									</h5> 
								</Form.Group>
								
						
								<Form.Group as={Col}  md="4">
									<Form.Label> Possui Advogado Estabelecido? </Form.Label>
									<h5> 
								     	{this.props.escritorio['possuiAdvogado'] ? 'Sim' : 'Não'}						
									</h5> 			
								</Form.Group>
							
							</Form.Row>
							
							
							<div style={{display: this.props.escritorio['possuiAdvogado'] ? 'block' : 'none' }} > 

								<Form.Row> 
									<Form.Group as={Col} md="8" controlId="9">
										<Form.Label>Nome do Advogado Principal</Form.Label>
										<h5> {this.props.escritorio['advogadoMaster']} </h5> 			
									</Form.Group>
									<Form.Group as={Col} md="4" controlId="formGridEmail">
										<Form.Label>E-mail do Advogado Principal</Form.Label>
										<h5> {this.props.escritorio['emailMaster']} </h5> 			
									</Form.Group>
								</Form.Row>
							
							
								<Form.Row>
									<Form.Group as={Col}  md="4" controlId="6">
										<Form.Label>OAB ou Matrícula</Form.Label>
										<div key="identificacaoMaster">
									      <Form.Control plaintext readOnly defaultValue={this.props.escritorio['identificacaoMaster']} />                                                                                                                                       
										</div>
									</Form.Group>
									<Form.Group controlId="formBasicChecbox">
										<div key="recebeCitacao">
									      <Form.Control plaintext readOnly defaultValue={this.props.escritorio['recebeCitacao']} />                                                                                                                                       
										</div>
									</Form.Group>
								</Form.Row>
							</div>							
							
							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="6">
									<Form.Label>Status da Solicitação</Form.Label>
									<div key="Status">
										<Form.Control  type="text" defaultValue={this.props.escritorio['status']}  ref="status"/>                                                                                                                                  
									</div>
								</Form.Group>
							</Form.Row>		

						</Modal.Body>
						
						
						<Modal.Footer>
				          <Button variant="secondary" onClick={this.handleClose}>
				            Fechar
				          </Button>
				          <Button variant="primary" onClick={this.handleSubmit}>
				            Salvar
				          </Button>
				        </Modal.Footer>
				      </Modal>
			      </form>

			</div>
		)
	}

};



class EscritorioList extends React.Component {

	constructor(props) {
		super(props);
    }

	render() {
		const escritorios = this.props.escritorios.map(escritorio =>
			<Escritorio key={escritorio._links.self.href} escritorio={escritorio} attributes={this.props.attributes} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}/>
		);

		return (
			<div>
				<Table>
					<tbody>
						<tr>
                            <th>#</th>
							<th>CNPJ</th>
							<th>Nome do Órgão/Empresa</th>
							<th>Telefone</th>
							<th>Status Solicitação</th>
							<th></th>
							<th></th>
						</tr>
						{escritorios}
					</tbody>
				</Table>
			</div>
		)
	}
}


class Escritorio extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.escritorio);
	}

	render() {
		return (
			<tr>

                <td>{this.props.escritorio.id}</td>
				<td>{this.props.escritorio.cnpj}</td>
                <td>{this.props.escritorio.nome}</td>
                <td>{this.props.escritorio.telefone}</td>
                <td>{this.props.escritorio.status}</td>
                <td>
                
                
					<UpdateDialog escritorio={this.props.escritorio}
					  attributes={this.props.attributes}
					  onUpdate={this.props.onUpdate}/>  
					  		
					
					
                </td>
				<td>
					<Button onClick={this.handleDelete}>Excluir</Button>
				</td>
			</tr>
		)
	}
}


class Admin extends Component {


  render() {
    return (
                <Header>
                    <AppAdmin/>
                </Header>
    );
  }
}

export default Admin;
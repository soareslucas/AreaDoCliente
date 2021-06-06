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
const Tab = require("react-bootstrap/Tab")
const Tabs = require("react-bootstrap/Tabs")

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import follow from '../../follow';
import client from '../../client';
import AuthenticationService from '../../service/AuthenticationService';
import Header from '../../common/header';
import { Link } from "react-router-dom";
const root = '/api';

import { MDBTable, MDBTableBody, MDBTableHead, MDBDataTable } from 'mdbreact';

import MaterialTable from 'material-table';
import Wrapper from '../../common/wrapper';



class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {campo:'', validated: false, alerta: false, clientes: [], sucesso: false, falha: false, clientes: [], attributes: [], pageSize: 50, links: {}};
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);    
		this.handleChange = this.handleChange.bind(this);    

	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'clientes', params: {size: pageSize}}]
		).then(clienteCollection => {
			return client({
				method: 'GET',
				path: clienteCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return clienteCollection;
			});
		}).done(clienteCollection => {
			this.setState({
				clientes: clienteCollection.entity._embedded.clientes,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: clienteCollection.entity._links});
		});
	}

	onDelete(cliente) {
		client({method: 'DELETE', path: cliente._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}
	
	onUpdate(cliente, updatedCliente) {
		client({
			method: 'PUT',
			path: cliente._links.self.href,
			entity: updatedCliente,
			headers: {
				'Content-Type': 'application/json'
			}
		}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
		document.body.classList.remove('sidebar-collapse'); 

	}
	
	buscarCampo(campo, busca) {
		
		var field = campo.charAt(0).toLowerCase() + campo.slice(1)
		
		client({
			method: 'GET',
			path: 'api/clientes/search/findBy'+campo+'ContainingIgnoreCase?'+field+'='+busca,
			headers: {'Content-Type': 'application/json'}
		}).then(clienteCollection => {
			this.setState({
				clientes: clienteCollection.entity._embedded.clientes});
			return clienteCollection.entity._embedded.clientes;
		}).done( clientes=>{			
			if(clientes.length == 0){
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
			var busca = '';
			busca = ReactDOM.findDOMNode(this.refs['busca']).value.trim();
			this.buscarCampo(this.state.campo, busca);
			this.setState({ validated: false });
			this.setState({ alerta: true });
		}
		
	}
	
	handleChange(e) {
		this.setState({ campo: ReactDOM.findDOMNode(this.refs['campo']).value.trim()});
	}
	

	render() {
		
		const { validated } = this.state;
		const statusBaixadas = 'Baixado';
		const statusEmAndamento = 'Em Andamento';

		return (
			<div>

				<div className="content-header">
                    <div className="container">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            {/* <h1 className="m-0 text-dark"> Top Navigation <small>Example 3.0</small></h1> */}
                        </div> {/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active">Admin</li>
                            </ol>
                        </div>{/* /.col */}
                        </div> {/* /.row */}
                    </div> {/* /.container-fluid */}
                </div>


				<div className="container">


					<Tabs defaultActiveKey="ativas" id="uncontrolled-tab-example">
						<Tab eventKey="ativas" title="Novos Clientes">
							<Form
							noValidate
							validated={validated}
							onSubmit={e => this.handleSubmit(e)} >
					
								<input ref="manager" type="hidden" name="manager" value="" />
								<input ref="status" type="hidden" name="status" value="" />
					
								<Form.Row>
									<Form.Group as={Col}  md="4" controlId="5">
											<Form.Label>&nbsp; &nbsp;</Form.Label>
											<div key="escolha">
												<Form.Control as="select" onChange={this.handleChange} placeholder="Escolha o Campo de Busca"   ref="campo">
													<option>Escolha o campo de busca...</option>
													<option value="Nome" >Nome do escritório</option>		
													<option value="Status" >Status</option>
													<option value="NomeRepresentante" >Nome Representante Legal</option>
												</Form.Control>
											</div>
									</Form.Group>
									<Form.Group as={Col} md="7" controlId="2">
										<Form.Label>&nbsp; &nbsp;</Form.Label>
										<div key="busca">
												<Form.Control placeholder="Escreva aqui sua pesquisa..." ref="busca"/>										
										</div>
									</Form.Group>
									<Form.Group as={Col} md="1" controlId="4">
										<Form.Label>&nbsp; &nbsp;</Form.Label>
										<div key="botao">
												<Button variant="primary" type="submit">
													Buscar
												</Button>
										</div>
									</Form.Group>					
								</Form.Row>
				
							</Form>
				
							<ClienteList clientes={this.state.clientes}
								links={this.state.links}
								pageSize={this.state.pageSize}
								onDelete={this.onDelete}
								onUpdate={this.onUpdate} 
								attributes={this.state.attributes}
								status={statusEmAndamento}

							/>
						
						</Tab>
							
						<Tab eventKey="baixadas" title="Contratos em Andamento">
						
							<ClienteList clientes={this.state.clientes}
							links={this.state.links}
							pageSize={this.state.pageSize}
							onDelete={this.onDelete}
							onUpdate={this.onUpdate} 
							attributes={this.state.attributes}  
							status={statusBaixadas}
							/>
						</Tab>
				
					</Tabs>
				</div>
			    
            </div>
		)
	}
}


class UpdateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {modal:  false};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}
	
	handleClose(){
		 this.setState({ modal: false });
	}
	
	handleShow(e){
		e.preventDefault();
		if(this.props.status != 'Baixado'){
			let updatedCliente = {};
			updatedCliente = this.props.cliente;
			updatedCliente['status'] = "Em análise";
			this.props.onUpdate(this.props.cliente, updatedCliente);
		}
		this.setState({ modal: true });
	}


	render() {

		const dialogId = "updateCliente-" + this.props.cliente._links.self.href;
		const { modal } = this.state;
		
		return (
			<div key={dialogId}>
			
				<Button onClick={this.handleShow}> <i className="fas fa-search-plus"></i> </Button>
				
				<form>
					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Atualizar Status</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="1">
									<Form.Label>CNPJ</Form.Label>
									<h5> {this.props.cliente['cnpj']} </h5> 			
								</Form.Group>
								<Form.Group as={Col} md="8" controlId="2">
									<Form.Label>Nome do Órgão ou Empresa</Form.Label>
									<h5> {this.props.cliente['nome']} </h5> 			
								</Form.Group>
							</Form.Row>
							
							<Form.Row>
								<Form.Group as={Col}   md="12" controlId="3">
									<Form.Label>Endereço</Form.Label>
									<h5> {this.props.cliente['endereco']} </h5> 			
								</Form.Group>
							</Form.Row>
						
							<Form.Row>
								<Form.Group as={Col}  md="6" controlId="4">
									<Form.Label>Nome do Representante Legal</Form.Label>
									<h5> {this.props.cliente['nomeRepresentante']} </h5> 			
								</Form.Group>
								<Form.Group as={Col}  md="6" controlId="5">
									<Form.Label>Vínculo do Representante Legal</Form.Label>
									<h5> {this.props.cliente['vinculo']} </h5> 			
								</Form.Group>
							</Form.Row>
									
							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="1">
									<Form.Label>CPF do Representante Legal</Form.Label>
									<h5> {this.props.cliente['cpf']} </h5> 			
								</Form.Group>
								<Form.Group as={Col}  md="4" controlId="6">
									<Form.Label>Telefone</Form.Label>
									<h5> {this.props.cliente['telefone']} </h5> 			
								</Form.Group>
								<Form.Group as={Col}   md="4" controlId="7">
									<Form.Label>Celular</Form.Label>
									<h5> {this.props.cliente['celular']} </h5> 			
								</Form.Group>
							</Form.Row>
							
							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="formGridEmail">
									<Form.Label>E-mail</Form.Label>
									<h5> {this.props.cliente['email']} </h5> 			
								</Form.Group>
								<Form.Group as={Col}  md="4">
									<Form.Label> Arquivo Comprobatório </Form.Label>
									<h5>
										<a href={'/downloadFile/'+this.props.cliente['id'] }> Download Arquivo </a>
									</h5> 
								</Form.Group>								
						
								<Form.Group as={Col}  md="4">
									<Form.Label> Possui Advogado Estabelecido? </Form.Label>
									<h5> 
								     	{this.props.cliente['possuiAdvogado'] ? 'Sim' : 'Não'}						
									</h5> 			
								</Form.Group>
							
							</Form.Row>
							
							
							<div style={{display: this.props.cliente['possuiAdvogado'] ? 'block' : 'none' }} > 

								<Form.Row> 
									<Form.Group as={Col} md="8" controlId="9">
										<Form.Label>Nome do Advogado Principal</Form.Label>
										<h5> {this.props.cliente['advogadoMaster']} </h5> 			
									</Form.Group>
									<Form.Group as={Col} md="4" controlId="formGridEmail">
										<Form.Label>E-mail do Advogado Principal</Form.Label>
										<h5> {this.props.cliente['emailMaster']} </h5> 			
									</Form.Group>
								</Form.Row>
							
							
								<Form.Row>
									<Form.Group as={Col}  md="4" controlId="6">
										<Form.Label>OAB ou Matrícula</Form.Label>
										<div key="identificacaoMaster">
											<h5> {this.props.cliente['identificacaoMaster']} </h5> 		
										</div>
									</Form.Group>
									<Form.Group controlId="formBasicChecbox">
										<Form.Label>Recebe Citação?</Form.Label>
										<div key="recebeCitacao">
											<h5>
												{this.props.cliente['recebeCitacao'] ? 'Sim' : 'Não'}
											</h5> 		
										</div>
									</Form.Group>
								</Form.Row>
								
							</div>							
						</Modal.Body>
						
						<Modal.Footer>
				          <Button variant="secondary" onClick={this.handleClose}>
				            Fechar
				          </Button>
				        </Modal.Footer>
				      </Modal>
			      </form>

			</div>
		)
	}

};



class ClienteList extends React.Component {

	constructor(props) {
		super(props);		
		this.mostraAlert = this.mostraAlert.bind(this);
		this.state = {baixadoSucesso:  false};
    }
	
	
	mostraAlert() {
		this.setState({ baixadoSucesso: true });
	}

	render() {
		const clientes = this.props.clientes.map(cliente =>{
				if(this.props.status == 'Em Andamento' && cliente.status != 'Baixado'){
					return  <Cliente key={cliente._links.self.href} cliente={cliente} attributes={this.props.attributes} mostraAlert={this.mostraAlert} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}  status={this.props.status} />
				}else{
					if(cliente.status == this.props.status)
						return  <Cliente key={cliente._links.self.href} cliente={cliente} attributes={this.props.attributes} mostraAlert={this.mostraAlert} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} status={this.props.status} />
				}
		});
		
		return (
				
			<div>
	
		    	{this.state.baixadoSucesso && <div className="alert alert-success" >Solicitação Baixada!</div>}	

		    	<Table>
					<tbody>
						<tr>
                            <th>#</th>
							<th>CNPJ</th>
							<th>Nome do Pessoa/Empresa</th>
							<th>Telefone</th>
							<th>Status Solicitação</th>
							<th>Detalhes</th>
							
							{(this.props.status != 'Baixado') &&  <th>Aprovar</th>}	
						</tr>
						{clientes}
					</tbody>
				</Table>
			</div>
		)
	}
}


class Cliente extends React.Component {

	constructor(props) {
		super(props);
		this.handleBaixar = this.handleBaixar.bind(this);
	}
	
	
	handleBaixar() {
		let updatedCliente = {};
		updatedCliente = this.props.cliente;
		updatedCliente['status'] = "Baixado";
		this.props.onUpdate(this.props.cliente, updatedCliente);		
		this.props.mostraAlert();
	}


	render() {
		return (
				
				<tr>
	
	                <td>{this.props.cliente.id}</td>
					<td>{this.props.cliente.cnpj}</td>
	                <td>{this.props.cliente.nome}</td>
	                <td>{this.props.cliente.telefone}</td>
	                <td>{this.props.cliente.status}</td>
	                <td>  
						<UpdateDialog cliente={this.props.cliente}
						  attributes={this.props.attributes}
						  onUpdate={this.props.onUpdate}
						  status={this.props.status}
						/>  
	                </td>
						
					{(this.props.status != 'Baixado') && <td> <Button alt="Baixar" onClick={this.handleBaixar}> <i className="fas fa-check-square"></i> </Button> </td> }	
					
					
				</tr>
		)
	}
}


class Admin extends Component {


  render() {
    return (
		<Wrapper>
			<App/>
		</Wrapper>
    );
  }
}

export default Admin;
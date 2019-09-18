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

import { MDBTable, MDBTableBody, MDBTableHead, MDBDataTable } from 'mdbreact';

import MaterialTable from 'material-table';



class AppAdmin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {campo:'', validated: false, alerta: false, escritorios: [], sucesso: false, falha: false, escritorios: [], attributes: [], pageSize: 50, links: {}};
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);    
		this.handleChange = this.handleChange.bind(this);    

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
	
	
	
	buscarCampo(campo, busca) {
		client({
			method: 'GET',
			path: 'api/escritorios/search/findBy'+campo+'?'+campo+'='+busca,
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
			var busca = '';
			
			
			busca = ReactDOM.findDOMNode(this.refs['busca']).value.trim()
			
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

		return (
			<div>

                <Breadcrumb>
                    <Breadcrumb.Item href="/">Início</Breadcrumb.Item>
                    <Breadcrumb.Item active href="Admin">Admin</Breadcrumb.Item>
                </Breadcrumb>
                
                
                
				<Form
				noValidate
				validated={validated}
				onSubmit={e => this.handleSubmit(e)} >
		
		            <input ref="manager" type="hidden" name="manager" value="" />
					<input ref="status" type="hidden" name="status" value="" />
		
					<Form.Row>

						
						<Form.Group as={Col}  md="4" controlId="5">
								<Form.Label>Campo de Busca</Form.Label>
								<div key="vinculo">
									<Form.Control as="select" onChange={this.handleChange} required placeholder="Escolha o Campo de Busca"   ref="campo">
										<option>Escolha...</option>
										<option value="cnpj">CNPJ</option>
										<option value="nome" >Nome do escritório</option>		
										<option value="status" >Status</option>
										<option value="nomeRepresentante" >Nome Representante Legal</option>

									</Form.Control>
									<Form.Control.Feedback type="invalid">
										Por favor selecione qual o campo de busca.
									</Form.Control.Feedback>
								</div>
						</Form.Group>
						

						
						<Form.Group as={Col} md="7" controlId="2">
							<Form.Label>&nbsp; &nbsp;</Form.Label>
							<div key="busca">
									<Form.Control required ref="busca"/>										
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
                
				
				

                <EscritorioList escritorios={this.state.escritorios}
                    links={this.state.links}
                    pageSize={this.state.pageSize}
                    onDelete={this.onDelete}
                	onUpdate={this.onUpdate} 
                	attributes={this.state.attributes} />
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
											<h5> {this.props.escritorio['identificacaoMaster']} </h5> 		
										</div>
									</Form.Group>
									<Form.Group controlId="formBasicChecbox">
										<Form.Label>Recebe Citação?</Form.Label>
										<div key="recebeCitacao">
											<h5>
												{this.props.escritorio['recebeCitacao'] ? 'Sim' : 'Não'}
											</h5> 		
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
		this.state = {
		    columns: [
			      { title: '#', field: 'id' },
			      { title: 'CNPJ', field: 'cnpj' },
			      { title: 'Nome do Escritório', field: 'nome' },
			      { title: 'Telefone', field: 'telefone' },
			      { title: 'Status', field: 'status' },
			      { title: 'Atualizar', field: 'atualizar' },
			    ],      
	     };
	     this.handleDelete = this.handleDelete.bind(this);

    }
				      

	handleDelete() {
		this.props.onDelete(this.props.escritorio);
	}

	      

	render() {
		
		
		
		const escritorios = this.props.escritorios.map(function(elem) {
			  return {
				  id: elem.id,
				  cnpj: elem.cnpj,
				  nome: elem.nome,
				  telefone: elem.telefone,
				  status: elem.status,			  } 
			});
		
		
		

		
		return (

			<div>
			
			
			

			
			
			
			
				<MaterialTable
					title=""
					columns={this.state.columns}
					data={escritorios}
					editable={{
					      onRowAdd: newData =>
			          new Promise(resolve => {
			            setTimeout(() => {
			              resolve();
			              const data = [...state.data];
			              data.push(newData);
			              setState({ ...state, data });
			            }, 600);
			          }),
				        onRowUpdate: (newData, oldData) =>
				          new Promise(resolve => {
				            setTimeout(() => {
				              resolve();
				              const data = [...state.data];
				              data[data.indexOf(oldData)] = newData;
				              setState({ ...state, data });
				            }, 600);
				          }),
				        onRowDelete: <Button onClick={this.handleDelete} >Excluir</Button>,
				      }}
					options={{
			          paging: false
			        }}
			      />

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
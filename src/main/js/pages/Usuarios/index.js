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
		this.state = {campo:'', validated: false, alerta: false, usuarios: [], sucesso: false, falha: false, 
		usuarios: [], attributes: [], pageSize: 50, links: {}, showMessageDelete:  false, showMessageAdd:  false, success:  false};
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onCreate = this.onCreate.bind(this);    
		this.handleChange = this.handleChange.bind(this);    
	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'usuarios', params: {size: pageSize}}]
		).then(usuarioCollection => {
			return client({
				method: 'GET',
				path: usuarioCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return usuarioCollection;
			});
		}).done(usuarioCollection => {
			this.setState({
				usuarios: usuarioCollection.entity._embedded.usuarios,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: usuarioCollection.entity._links});
		});
	}

	onDelete(usuario) {
		client({method: 'DELETE', path: usuario._links.self.href})
		.done(response => {
			this.setState({ showMessageAdd: false });

			this.setState({ showMessageDelete: true });

			this.setState({ success: true });
			this.loadFromServer(this.state.pageSize);


		});
	}
	
	onUpdate(usuario, updatedUsuario) {
		client({
			method: 'PUT',
			path: usuario._links.self.href,
			entity: updatedUsuario,
			headers: {
				'Content-Type': 'application/json'
			}
		}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	onCreate(newUsuario) {     
			client({
				method: 'POST',
				path: 'api/usuarios',
				entity: newUsuario,
				headers: {'Content-Type': 'application/json'}
			}).done(response => {
				this.setState({ showMessageDelete: false });
				this.setState({ showMessageAdd: true });

				this.setState({ success: true });
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
			path: 'api/usuarios/search/findBy'+campo+'ContainingIgnoreCase?'+field+'='+busca,
			headers: {'Content-Type': 'application/json'}
		}).then(usuarioCollection => {
			this.setState({
				usuarios: usuarioCollection.entity._embedded.usuarios});
			return usuarioCollection.entity._embedded.usuarios;
		}).done( usuarios=>{			
			if(usuarios.length == 0){
				this.setState({ falha: true});
				this.setState({ sucesso: false});

			}else{
				this.setState({ falha: false});
				this.setState({ sucesso: true});
			}
		});	
	}

	
	handleChange(e) {
		this.setState({ campo: ReactDOM.findDOMNode(this.refs['campo']).value.trim()});
	}


	render() {
		
		const { validated } = this.state;

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
                            <li className="breadcrumb-item active">Usuários</li>
                            </ol>
                        </div>{/* /.col */}
                        </div> {/* /.row */}
                    </div> {/* /.container-fluid */}
                </div>

                <div className="content">

					<div className="container">

						{this.state.showMessageAdd == true && this.state.success == true && <div className="form-group alert alert-success " >Usuário adicionado!</div>}
						{this.state.showMessageAdd == true && this.state.success == false && <div className="form-group alert alert-warning " >Ocorreu um problema. O usuário não pôde ser adicionado!</div>}
						{this.state.showMessageDelete == true && this.state.success == true && <div className="form-group alert alert-success " >Usuário excluído!</div>}
						{this.state.showMessageDelete == true && this.state.success == false && <div className="form-group alert alert-warning " >Ocorreu um problema. O usuário não pôde ser excluído!</div>}



						<Tabs defaultActiveKey="ativas" id="uncontrolled-tab-example">
							<Tab eventKey="ativas" title="Usuários">





								<AddDialog
									attributes={this.props.attributes}
									onUpdate={this.props.onUpdate}
									onCreate={this.onCreate}
								/>  
					
								<UsuarioList
									usuarios={this.state.usuarios}
									links={this.state.links}
									pageSize={this.state.pageSize}
									onDelete={this.onDelete}
									onUpdate={this.onUpdate} 
									attributes={this.state.attributes}
								/>
							
							</Tab>

						</Tabs>
					</div>
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
		this.setState({ modal: true });
	}


	render() {

		const dialogId = "updateUsuario-" + this.props.usuario._links.self.href;
		const { modal } = this.state;
		
		return (
			<div key={dialogId}>
			
				<Button onClick={this.handleShow}> <i className="fas fa-search-plus"></i> </Button>
				
				<form>
					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Detalhes</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="1">
									<Form.Label>Nome</Form.Label>
									<h5> {this.props.usuario['name']} </h5> 			
								</Form.Group>
								<Form.Group as={Col} md="8" controlId="2">
									<Form.Label>Perfil de Acesso</Form.Label>
									<h5> {this.props.usuario['roles']} </h5> 			
								</Form.Group>
							</Form.Row>
							
						
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


class AddDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {modal:  false, validated: false};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	
	handleClose(){
		 this.setState({ modal: false });
	}
	
	handleShow(e){
		e.preventDefault();
		this.setState({ modal: true });
	}


	handleSubmit(e) {
		
		e.preventDefault();
		const form = e.currentTarget;
			
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ validated: true });

		} else{
			const newUsuario = {};
			
			newUsuario['name'] = ReactDOM.findDOMNode(this.refs['name']).value.trim();
			newUsuario['roles'] =  [ReactDOM.findDOMNode(this.refs['roles']).value.trim()];
			newUsuario['password'] = ReactDOM.findDOMNode(this.refs['password']).value.trim();

			this.props.onCreate(newUsuario);

			this.setState({ validated: false });
			this.setState({ modal: false });

			
			ReactDOM.findDOMNode(this.refs['name']).value = '';
			ReactDOM.findDOMNode(this.refs['roles']).value = '';
			ReactDOM.findDOMNode(this.refs['password']).value = '';

		}


	}


	render() {

		const { validated } = this.state;
		const dialogId = "addUsuario";
		const { modal } = this.state;
		
		return (
			<div key={dialogId}>



					<Row>

						<Form.Group as={Col} md="10" controlId="4">

						</Form.Group>	

						<Form.Group as={Col} md="2" controlId="5">
							<Form.Label>&nbsp; &nbsp;</Form.Label>
							<div key="botao">
								<Button onClick={this.handleShow} variant="primary" type="button">
									Adicionar Usuário <i className="fas fa-plus-square"></i>
								</Button>	
							</div>
						</Form.Group>			

					</Row>


					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Adicionar Usuário</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

						<Form name = "addForm"
								noValidate
								validated={validated}
								onSubmit={e => this.handleSubmit(e)} >

								<Form.Row>
									<Form.Group as={Col} md="8" controlId="1">
										<Form.Label>Nome do Usuário</Form.Label>
										<div key="name">
											<Form.Control required type="text"   placeholder="Nome do Usuário" ref="name" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o Nome do Usuário.
											</Form.Control.Feedback>
										</div>
									</Form.Group>
								</Form.Row>

								<Form.Row>
									<Form.Group as={Col} md="8" controlId="2">
										<Form.Label>Senha</Form.Label>
										<div key="password">
											<Form.Control required type="password"   placeholder="Senha" ref="password" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva a senha.
											</Form.Control.Feedback>
										</div>
									</Form.Group>
								</Form.Row>

								<Form.Row>

									<Form.Group as={Col}  md="6" controlId="3">
										<Form.Label>Role</Form.Label>
										<div key="roles">
											<Form.Control as="select" required placeholder="Perfil de Acesso"   ref="roles">
												<option>Escolha...</option>
												<option>ROLE_ADMIN</option>
												<option>ROLE_MANAGER</option>		
												<option>ROLE_INTERNE</option>


											</Form.Control>
											<Form.Control.Feedback type="invalid">
												Por favor selecione qual o perfil de acesso do usuário.
											</Form.Control.Feedback>
										</div>
									</Form.Group>
								</Form.Row>							

{/* 
								<Row>
									<Col md="10">
									</Col>
									<Col md="2">

									</Col>
								</Row> */}
							
							<Modal.Footer>
								<Button variant="secondary" onClick={this.handleClose}>
									Fechar
								</Button>

								<Button variant="primary"  type="submit">
									Concluir
								</Button>

				        	</Modal.Footer>


						
							</Form>

						</Modal.Body>
						

				      </Modal>


								

			</div>
		)
	}

};


class UsuarioList extends React.Component {

	constructor(props) {
		super(props);		
    }
	
	

	render() {
		const usuarios = this.props.usuarios.map(usuario =>{
			return  <Usuario key={usuario._links.self.href} usuario={usuario} state={this.state} attributes={this.props.attributes} 
			 onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}  status={this.props.status} />
		});


		
		return (
				
			<div>				
		    	<Table>
					<tbody>
						<tr>
                            <th>#</th>
							<th>Nome</th>
							<th>Perfil de Acesso</th>
							<th>Detalhes</th>
							<th>Excluir</th>	
						</tr>
						{usuarios}
					</tbody>
				</Table>
			</div>
		)
	}
}


class Usuario extends React.Component {

	constructor(props) {
		super(props);
	}
	

	render() {
		return (
				
				<tr>
	
	                <td>{this.props.usuario.id}</td>
					<td>{this.props.usuario.name}</td>
	                <td>{this.props.usuario.roles}</td>

	                <td>  
						<UpdateDialog usuario={this.props.usuario}
						  attributes={this.props.attributes}
						  onUpdate={this.props.onUpdate}
						  status={this.props.status}
						/>  
	                </td>
						
					<td> 
						<DeleteConfirmationDialog usuario={this.props.usuario}
							attributes={this.props.attributes}
							onDelete={this.props.onDelete}
							mostraAlert={this.props.mostraAlert}
							status={this.props.status}
							state={this.props.state}
							/>  	
					</td> 
					
					
				</tr>
		)
	}
}

class DeleteConfirmationDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {modal:  false};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	
	handleClose(){
		 this.setState({ modal: false });
	}
	
	handleShow(e){
		e.preventDefault();
		this.setState({ modal: true });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onDelete(this.props.usuario);
	}



	render() {

		const dialogId = "addUsuario"+this.props.usuario.id;
		const { modal } = this.state;
		
		return (
			<div key={dialogId}>




					<Button onClick={this.handleShow} variant="primary" type="button">
						<i className="fas fa-trash-alt"></i>
					</Button>	
	


					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Excluir Usuário</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

						<Form name = "deleteForm"
								onSubmit={e => this.handleSubmit(e)} >

							
							Tem certeza que deseja excluir o Usuário?
							
							<Modal.Footer>
								<Button variant="secondary" onClick={this.handleClose}>
									Não
								</Button>

								<Button variant="primary"  type="submit">
									Sim
								</Button>

				        	</Modal.Footer>

						
							</Form>

						</Modal.Body>
						

				      </Modal>


								

			</div>
		)
	}

};









class Usuarios extends Component {


  render() {
    return (
		<Wrapper>
			<App/>
		</Wrapper>
    );
  }
}

export default Usuarios;
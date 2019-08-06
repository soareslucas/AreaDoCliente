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
		const updatedEscritorio = {};
		this.props.attributes.forEach(attribute => {
			updatedEscritorio[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.escritorio, updatedEscritorio);
		this.setState({ modal: false })
	}
	
	
	mostraModal(){
		 this.setState({ modal: true });
	}
	
	handleClose(){
		 this.setState({ modal: false });
	}
	
	handleShow(){
		 this.setState({ modal: true });
	}
	
	

	render() {
		const inputs = this.props.attributes.map(attribute =>
		
//			if(attribute == 'id'){
//				
//				<a href="/downloadFile/{fileId}" >Visit W3Schools</a>
//				
//				
//				<Link className="nav-link" to="/admin" onClick={AuthenticationService.logout}>Logout</Link>
//
//				
//			}else{
				<p key={attribute+this.props.escritorio[attribute]}>
					<input type="text" placeholder={attribute}
						   defaultValue={this.props.escritorio[attribute]}
						   ref={attribute} className="field"/>
				</p>
				
//			}
		

				
				
				
				
		);

		const dialogId = "updateEscritorio-" + this.props.escritorio._links.self.href;
		const { modal } = this.state;
		
		return (
			<div key={dialogId}>
			
				<Button onClick={this.handleShow}>Update</Button>
				
				<form>
					<Modal show={modal} onHide={this.handleClose}>
				        <Modal.Header closeButton>
				          <Modal.Title>Atualizar Status</Modal.Title>
				        </Modal.Header>
						
						{inputs}
	
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
							<th>Nome do Representante</th>
							<th>Telefone</th>
							<th>Advogado Master</th>
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
                <td>{this.props.escritorio.nomeRepresentante}</td>
                <td>{this.props.escritorio.telefone}</td>
                <td>{this.props.escritorio.advogadoMaster}</td>
                <td>
                
                
					<UpdateDialog escritorio={this.props.escritorio}
					  attributes={this.props.attributes}
					  onUpdate={this.props.onUpdate}/>  
					  		
					
					
                </td>
				<td>
					<Button onClick={this.handleDelete}>Delete</Button>
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
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
import axios from 'axios'


import { MDBTable, MDBTableBody, MDBTableHead, MDBDataTable } from 'mdbreact';

import MaterialTable from 'material-table';
import Wrapper from '../../common/wrapper';



class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {campo:'', validated: false, alerta: false, planos: [], sucesso: false, falha: false, 
		planos: [], servicos: [], attributes: [], pageSize: 50, links: {}, showMessageDelete:  false, showMessageAdd:  false, success:  false};
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onCreate = this.onCreate.bind(this);    
		this.handleChange = this.handleChange.bind(this);    
	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'planos', params: {size: pageSize}}]
		).then(planoCollection => {
			return client({
				method: 'GET',
				path: planoCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return planoCollection;
			});
		}).done(planoCollection => {
			this.setState({
				planos: planoCollection.entity._embedded.planos,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: planoCollection.entity._links});
		});
	}

	onDelete(plano) {
		client({method: 'DELETE', path: plano._links.self.href})
		.done(response => {
			this.setState({ showMessageAdd: false });

			this.setState({ showMessageDelete: true });

			this.setState({ success: true });
			this.loadFromServer(this.state.pageSize);


		});
	}
	
	onUpdate(plano, updatedPlano) {
		client({
			method: 'PUT',
			path: plano._links.self.href,
			entity: updatedPlano,
			headers: {
				'Content-Type': 'application/json'
			}
		}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	onCreate(newPlano) {     
			client({
				method: 'POST',
				path: 'api/planos',
				entity: newPlano,
				headers: {'Content-Type': 'application/json'}
			}).done(response => {
				this.setState({ showMessageDelete: false });
				this.setState({ showMessageAdd: true });

				this.setState({ success: true });
				this.loadFromServer(this.state.pageSize);
			});
	}




	loadServicos() {
		follow(client, root, [
			{rel: 'servicos'}]
		).then(servicoCollection => {
			return client({
				method: 'GET',
				path: servicoCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return servicoCollection;
			});
		}).done(servicoCollection => {
			this.setState({
				servicos: servicoCollection.entity._embedded.servicos});
		});
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
		this.loadServicos();
		document.body.classList.remove('sidebar-collapse'); 

	}
	
	buscarCampo(campo, busca) {
		
		var field = campo.charAt(0).toLowerCase() + campo.slice(1)
		
		client({
			method: 'GET',
			path: 'api/planos/search/findBy'+campo+'ContainingIgnoreCase?'+field+'='+busca,
			headers: {'Content-Type': 'application/json'}
		}).then(planoCollection => {
			this.setState({
				planos: planoCollection.entity._embedded.planos});
			return planoCollection.entity._embedded.planos;
		}).done( planos=>{			
			if(planos.length == 0){
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
                            <li className="breadcrumb-item active">Planos</li>
                            </ol>
                        </div>{/* /.col */}
                        </div> {/* /.row */}
                    </div> {/* /.container-fluid */}
                </div>

                <div className="content">

					<div className="container">

						{this.state.showMessageAdd == true && this.state.success == true && <div className="form-group alert alert-success " >Plano adicionado!</div>}
						{this.state.showMessageAdd == true && this.state.success == false && <div className="form-group alert alert-warning " >Ocorreu um problema. O Plano não pôde ser adicionado!</div>}
						{this.state.showMessageDelete == true && this.state.success == true && <div className="form-group alert alert-success " >Plano excluído!</div>}
						{this.state.showMessageDelete == true && this.state.success == false && <div className="form-group alert alert-warning " >Ocorreu um problema. O Plano não pôde ser excluído!</div>}



						<Tabs defaultActiveKey="ativas" id="uncontrolled-tab-example">
							<Tab eventKey="ativas" title="Planos">

								<AddDialog
									planos={this.state.planos}

									servicos={this.state.servicos}

									attributes={this.props.attributes}
									onUpdate={this.props.onUpdate}
									onCreate={this.onCreate}
								/>  
					
								<PlanoList
									planos={this.state.planos}
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
		this.state = {modal:  false, servicosPlano: []};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}
	
	handleClose(){
		 this.setState({ modal: false });
	}
	
	handleShow(e){

		e.preventDefault();

		var personal = this.props.plano['personalizado'];

		
				
		
		this.loadServicosPlano(this.props.plano._links.servicos.href);

		this.setState({ modal: true });
	}

	loadServicosPlano(url) {

		client({
			method: 'GET',
			path: url,
			headers: {'Accept': 'application/hal+json'}
		}).then(response => {
			var listaServicos = response.entity._embedded.servicos;
			console.log(listaServicos);
			return listaServicos;
		}).done(listaServicos => {
		this.setState({
			servicosPlano: listaServicos});
		});

}



	render() {

		const { servicosPlano } = this.state;
		
		const servicos = servicosPlano.map(servico =>{
			return  <p key={servico.id} > {servico.name}</p>
		});

		const dialogId = "updatePlano-" + this.props.plano._links.self.href;
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
								<Form.Group as={Col}  md="6" controlId="1">
									<Form.Label>Nome</Form.Label>
									<h5> {this.props.plano['name']} </h5> 			
								</Form.Group>


								<Form.Group as={Col}  md="6" controlId="2">
									<Form.Label>Vigência</Form.Label>
									<h5> {this.props.plano['vigencia']} </h5> 			
								</Form.Group>


							</Form.Row>


							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="3">
									<Form.Label>Serviços</Form.Label>
									<h5> {servicos} </h5> 			
								</Form.Group>


								<Form.Group as={Col}  md="4" controlId="4">
									<Form.Label>Vigência</Form.Label>
									<h5> {this.props.plano['valor']} </h5> 			
								</Form.Group>

								<Form.Group as={Col}  md="4" controlId="5">
									<Form.Label>Personalizado?</Form.Label>
									<h5> {  String(this.props.plano['personalizado']) } </h5> 			
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
			const newPlano = {};
			
			newPlano['name'] = ReactDOM.findDOMNode(this.refs['name']).value.trim();
			newPlano['vigencia'] = ReactDOM.findDOMNode(this.refs['vigencia']).value.trim();
			newPlano['valor'] = ReactDOM.findDOMNode(this.refs['valor']).value.trim();

			
			newPlano['servicos']  = [ReactDOM.findDOMNode(this.refs['servicos']).value.trim()];


			this.props.onCreate(newPlano);

			this.setState({ validated: false });
			this.setState({ modal: false });

			
			ReactDOM.findDOMNode(this.refs['name']).value = '';
			ReactDOM.findDOMNode(this.refs['vigencia']).value = '';
			ReactDOM.findDOMNode(this.refs['servicos']).value = '';
			ReactDOM.findDOMNode(this.refs['valor']).value = '';



		}


	}


	render() {

		const { validated } = this.state;
		const dialogId = "addPlano";
		const { modal } = this.state;

		const servicos = this.props.servicos.map(servico =>{
			return  <option key={servico.name} value={servico._links.self.href}> {servico.name}</option>
		});
		
		return (
			<div key={dialogId}>



					<Row>

						<Form.Group as={Col} md="10" controlId="4">

						</Form.Group>	

						<Form.Group as={Col} md="2" controlId="5">
							<Form.Label>&nbsp; &nbsp;</Form.Label>
							<div key="botao">
								<Button onClick={this.handleShow} variant="primary" type="button">
									Adicionar Plano <i className="fas fa-plus-square"></i>
								</Button>	
							</div>
						</Form.Group>			

					</Row>


					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Adicionar Plano</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

						<Form name = "addForm"
								noValidate
								validated={validated}
								onSubmit={e => this.handleSubmit(e)} >

								<Form.Row>
									<Form.Group as={Col} md="8" controlId="1">
										<Form.Label>Nome</Form.Label>
										<div key="name">
											<Form.Control required type="text"   placeholder="Nome do Plano" ref="name" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o Nome do Plano.
											</Form.Control.Feedback>
										</div>
									</Form.Group>

									<Form.Group as={Col} md="4" controlId="1">
										<Form.Label>Vigência (Meses)</Form.Label>
										<div key="vigencia">
											<Form.Control required type="text"   placeholder="Quantidade de Meses da Vigência" ref="vigencia" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva a Vigência do Plano.
											</Form.Control.Feedback>
										</div>
									</Form.Group>
								</Form.Row>


								<Form.Row>

									<Form.Group as={Col}  md="8" controlId="5">
										<Form.Label>Serviços </Form.Label>
										<div key="servicos">
											<Form.Control as="select" required placeholder="Serviços"   ref="servicos">
												<option>Escolha...</option>

												{servicos}

											</Form.Control>
											<Form.Control.Feedback type="invalid">
												Por favor selecione qual o vínculo do responsável com o órgão.
											</Form.Control.Feedback>
										</div>
										
									</Form.Group>
									
									<Form.Group as={Col} md="4" controlId="1">
										<Form.Label>Valor Total do Plano</Form.Label>
										<div key="valor">
											<Form.Control required type="text"   placeholder="Valor do Plano" ref="valor" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o Valor do Plano.
											</Form.Control.Feedback>
										</div>
									</Form.Group>
										
								</Form.Row>




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


class PlanoList extends React.Component {

	constructor(props) {
		super(props);		
    }
	
	

	render() {
		const planos = this.props.planos.map(plano =>{
			return  <Plano key={plano._links.self.href} plano={plano} state={this.state} attributes={this.props.attributes} 
			 onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}  status={this.props.status} />
		});


		
		return (
				
			<div>				
		    	<Table>
					<tbody>
						<tr>
                            <th>#</th>
							<th>Nome</th>
							<th>Detalhes</th>
							<th>Excluir</th>	
						</tr>
						{planos}
					</tbody>
				</Table>
			</div>
		)
	}
}


class Plano extends React.Component {

	constructor(props) {
		super(props);
	}
	

	render() {
		return (
				
				<tr>
	
	                <td>{this.props.plano.id}</td>
					<td>{this.props.plano.name}</td>

	                <td>  
						<UpdateDialog plano={this.props.plano}
						  attributes={this.props.attributes}
						  onUpdate={this.props.onUpdate}
						  status={this.props.status}
						/>  
	                </td>
						
					<td> 
						<DeleteConfirmationDialog plano={this.props.plano}
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
		this.props.onDelete(this.props.plano);
	}



	render() {

		const dialogId = "addPlano"+this.props.plano.id;
		const { modal } = this.state;
		
		return (
			<div key={dialogId}>




					<Button onClick={this.handleShow} variant="primary" type="button">
						<i className="fas fa-trash-alt"></i>
					</Button>	
	


					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Excluir Plano</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

						<Form name = "deleteForm"
								onSubmit={e => this.handleSubmit(e)} >

							
							Tem certeza que deseja excluir o Plano?
							
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









class Planos extends Component {


  render() {
    return (
		<Wrapper>
			<App/>
		</Wrapper>
    );
  }
}

export default Planos;
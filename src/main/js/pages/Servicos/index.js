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
		this.state = {campo:'', validated: false, alerta: false, servicos: [], sucesso: false, falha: false, 
		servicos: [], attributes: [], pageSize: 50, links: {}, showMessageDelete:  false, showMessageAdd:  false, showMessageUpdate: false, success:  false};
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onCreate = this.onCreate.bind(this);    
		this.handleChange = this.handleChange.bind(this);    
	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'servicos', params: {size: pageSize}}]
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
				servicos: servicoCollection.entity._embedded.servicos,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: servicoCollection.entity._links});
		});
	}

	onDelete(servico) {
		client({method: 'DELETE', path: servico._links.self.href})
		.done(response => {
			this.setState({ showMessageAdd: false });
			this.setState({ showMessageDelete: true });
			this.setState({ success: true });
			this.loadFromServer(this.state.pageSize);


		});
	}
	
	onUpdate(servico, updatedServico) {
		client({
			method: 'PUT',
			path: servico._links.self.href,
			entity: updatedServico,
			headers: {
				'Content-Type': 'application/json'
			}
		}).done(response => {
			this.loadFromServer(this.state.pageSize);
			this.setState({ showMessageUpdate: true });
			this.setState({ success: true });

		});
	}

	onCreate(newServico) {     
			client({
				method: 'POST',
				path: 'api/servicos',
				entity: newServico,
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
			path: 'api/servicos/search/findBy'+campo+'ContainingIgnoreCase?'+field+'='+busca,
			headers: {'Content-Type': 'application/json'}
		}).then(servicoCollection => {
			this.setState({
				servicos: servicoCollection.entity._embedded.servicos});
			return servicoCollection.entity._embedded.servicos;
		}).done( servicos=>{			
			if(servicos.length == 0){
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
                            <li className="breadcrumb-item active">Servicos</li>
                            </ol>
                        </div>{/* /.col */}
                        </div> {/* /.row */}
                    </div> {/* /.container-fluid */}
                </div>

                <div className="content">

					<div className="container">

						{this.state.showMessageUpdate == true && this.state.success == true && <div className="form-group alert alert-success " >Serviço alterado!</div>}

						{this.state.showMessageAdd == true && this.state.success == true && <div className="form-group alert alert-success " >Serviço adicionado!</div>}
						{this.state.showMessageAdd == true && this.state.success == false && <div className="form-group alert alert-warning " >Ocorreu um problema. O Serviço não pôde ser adicionado!</div>}
						{this.state.showMessageDelete == true && this.state.success == true && <div className="form-group alert alert-success " >Serviço excluído!</div>}
						{this.state.showMessageDelete == true && this.state.success == false && <div className="form-group alert alert-warning " >Ocorreu um problema. O Serviço não pôde ser excluído!</div>}



						<Tabs defaultActiveKey="ativas" id="uncontrolled-tab-example">
							<Tab eventKey="ativas" title="Servicos">





								<AddDialog
									attributes={this.props.attributes}
									onUpdate={this.props.onUpdate}
									onCreate={this.onCreate}
								/>  
					
								<ServicoList
									servicos={this.state.servicos}
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
		this.state = {modal:  false, editar: false, detalhes: true};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleTemplateChange = this.handleTemplateChange.bind(this);


	}

	handleTemplateChange(){
	}
	
	handleClose(){
		 this.setState({ modal: false });
		 this.setState({ editar: false });
		 this.setState({ detalhes: true });
 
	}
	
	handleShow(e){
		e.preventDefault();
		this.setState({ modal: true });
	}

	handleEdit(e){

		if (this.state.editar == false){
			this.setState({ editar: true });
			this.setState({ detalhes: false });
		}else{
			this.setState({ editar: false });
			this.setState({ detalhes: true });
		}

		e.preventDefault();
	}


	handleUpdate(){

		let updatedServico = {};
		updatedServico = this.props.servico;

		updatedServico['name'] = ReactDOM.findDOMNode(this.refs['name']).value.trim();
		updatedServico['valor'] =  ReactDOM.findDOMNode(this.refs['valor']).value.trim();
		
		this.props.onUpdate(this.props.servico, updatedServico);

		this.setState({ modal: false });

		
		ReactDOM.findDOMNode(this.refs['name']).value = '';
		ReactDOM.findDOMNode(this.refs['valor']).value = '';

		this.setState({ editar: false });
		this.setState({ detalhes: true });


	}


	render() {

		const dialogId = "updateServico-" + this.props.servico._links.self.href;
		const { modal } = this.state;
		const { detalhes } = this.state;
		const { editar } = this.state;		
		return (
			<div key={dialogId}>
			
				<Button onClick={this.handleShow}> <i className="fas fa-search-plus"></i> </Button>
				
				<form>
					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
							<Modal.Title>
								<div style={{display: detalhes ? 'block' : 'none' }} > 
									Detalhes <Button title="Editar" variant="secondary" onClick={this.handleEdit}><i className="fas fa-edit"></i></Button> 
								</div>
								<div style={{display: editar ? 'block' : 'none' }} > 
									Detalhes <Button title="Editar" variant="primary" onClick={this.handleEdit}><i className="fas fa-edit"></i></Button> 
								</div>
							</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>
							<div style={{display: detalhes ? 'block' : 'none' }} > 
								<Form.Row>
									<Form.Group as={Col}  md="8" controlId="1">
										<Form.Label>Nome do Serviço</Form.Label>
										<h5> {this.props.servico['name']} </h5> 			
									</Form.Group>


									<Form.Group as={Col}  md="4" controlId="1">
										<Form.Label>Valor do Serviço</Form.Label>
										<h5> {this.props.servico['valor']} </h5> 			
									</Form.Group>
								</Form.Row>
							</div>


							<div style={{display: editar ? 'block' : 'none' }} > 
								<Form.Row>
									<Form.Group as={Col} md="8" controlId="1">
										<Form.Label>Nome do Serviço</Form.Label>
										<div key="name">
											<Form.Control required type="text"  onChange={this.handleTemplateChange}  defaultValue={this.props.servico['name']}   placeholder="Nome do Usuário" ref="name" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o Nome do Serviço.
											</Form.Control.Feedback>
										</div>
									</Form.Group>

									<Form.Group as={Col} md="4" controlId="2">
										<Form.Label>Valor do Serviço</Form.Label>
										<div key="valor">
											<Form.Control required type="valor"  onChange={this.handleTemplateChange} defaultValue= {this.props.servico['valor']}  placeholder="Valor" ref="valor" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o Valor.
											</Form.Control.Feedback>
										</div>
									</Form.Group>
								</Form.Row>
							</div>		
						</Modal.Body>
						
						<Modal.Footer>
							<div style={{display: editar ? 'block' : 'none' }} > 
								<Button variant="primary" onClick={this.handleUpdate}>
									Concluir
								</Button>
							</div>
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
			const newServico = {};
			
			newServico['name'] = ReactDOM.findDOMNode(this.refs['name']).value.trim();
			newServico['valor'] = ReactDOM.findDOMNode(this.refs['valor']).value.trim();


			this.props.onCreate(newServico);

			this.setState({ validated: false });
			this.setState({ modal: false });

			
			ReactDOM.findDOMNode(this.refs['name']).value = '';
			ReactDOM.findDOMNode(this.refs['valor']).value = '';



		}


	}


	render() {

		const { validated } = this.state;
		const dialogId = "addServico";
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
									Adicionar Serviço <i className="fas fa-plus-square"></i>
								</Button>	
							</div>
						</Form.Group>			

					</Row>


					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Adicionar Serviço</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

						<Form name = "addForm"
								noValidate
								validated={validated}
								onSubmit={e => this.handleSubmit(e)} >

								<Form.Row>
									<Form.Group as={Col} md="6" controlId="1">
										<Form.Label>Nome do Serviço</Form.Label>
										<div key="name">
											<Form.Control required type="text"   placeholder="Nome do Servico" ref="name" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o Nome do Serviço.
											</Form.Control.Feedback>
										</div>
									</Form.Group>



									<Form.Group as={Col} md="6" controlId="1">
										<Form.Label>Valor Individual do Serviço</Form.Label>
										<div key="valor">
											<Form.Control required type="text"   placeholder="Valor do Serviço" ref="valor" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o Valor do Serviço.
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


class ServicoList extends React.Component {

	constructor(props) {
		super(props);		
    }
	
	

	render() {
		const servicos = this.props.servicos.map(servico =>{
			return  <Servico key={servico._links.self.href} servico={servico} state={this.state} attributes={this.props.attributes} 
			 onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}  status={this.props.status} />
		});


		
		return (
				
			<div>				
		    	<Table>
					<tbody>
						<tr>
                            <th>#</th>
							<th>Nome</th>
							<th>Valor</th>

							<th>Detalhes</th>
							<th>Excluir</th>	
						</tr>
						{servicos}
					</tbody>
				</Table>
			</div>
		)
	}
}


class Servico extends React.Component {

	constructor(props) {
		super(props);
	}
	

	render() {
		return (
				
				<tr>
	
	                <td>{this.props.servico.id}</td>
					<td>{this.props.servico.name}</td>
					<td>{this.props.servico.valor}</td>


	                <td>  
						<UpdateDialog servico={this.props.servico}
						  attributes={this.props.attributes}
						  onUpdate={this.props.onUpdate}
						  status={this.props.status}
						/>  
	                </td>
						
					<td> 
						<DeleteConfirmationDialog servico={this.props.servico}
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
		this.props.onDelete(this.props.servico);
	}



	render() {

		const dialogId = "addServico"+this.props.servico.id;
		const { modal } = this.state;
		
		return (
			<div key={dialogId}>




					<Button onClick={this.handleShow} variant="primary" type="button">
						<i className="fas fa-trash-alt"></i>
					</Button>	
	


					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Excluir Servico</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

						<Form name = "deleteForm"
								onSubmit={e => this.handleSubmit(e)} >

							
							Tem certeza que deseja excluir o Servico?
							
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









class Servicos extends Component {


  render() {
    return (
		<Wrapper>
			<App/>
		</Wrapper>
    );
  }
}

export default Servicos;
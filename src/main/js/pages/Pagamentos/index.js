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
		this.state = {campo:'', validated: false, alerta: false, pagamentos: [], clientes: [], planos: [],  sucesso: false, falha: false, 
		pagamentos: [], attributes: [], pageSize: 50, links: {}, showMessageDelete:  false, showMessageAdd:  false, success:  false};
		this.onDelete = this.onDelete.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onCreate = this.onCreate.bind(this);    
		this.handleChange = this.handleChange.bind(this);    
	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'pagamentos', params: {size: pageSize}}]
		).then(pagamentoCollection => {
			return client({
				method: 'GET',
				path: pagamentoCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return pagamentoCollection;
			});
		}).done(pagamentoCollection => {
			this.setState({
				pagamentos: pagamentoCollection.entity._embedded.pagamentos,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: pagamentoCollection.entity._links});
		});
	}

	onDelete(pagamento) {
		client({method: 'DELETE', path: pagamento._links.self.href})
		.done(response => {
			this.setState({ showMessageAdd: false });

			this.setState({ showMessageDelete: true });

			this.setState({ success: true });
			this.loadFromServer(this.state.pageSize);


		});
	}
	
	onUpdate(pagamento, updatedPagamento) {
		client({
			method: 'PUT',
			path: pagamento._links.self.href,
			entity: updatedPagamento,
			headers: {
				'Content-Type': 'application/json'
			}
		}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	onCreate(newPagamento) {     
			client({
				method: 'POST',
				path: 'api/pagamentos',
				entity: newPagamento,
				headers: {'Content-Type': 'application/json'}
			}).done(response => {
				this.setState({ showMessageDelete: false });
				this.setState({ showMessageAdd: true });

				this.setState({ success: true });
				this.loadFromServer(this.state.pageSize);
			});
	}


	loadClientes() {
		follow(client, root, [
			{rel: 'clientes'}]
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
				clientes: clienteCollection.entity._embedded.clientes});
		});
	}

	loadPlanos() {
		follow(client, root, [
			{rel: 'planos'}]
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
				planos: planoCollection.entity._embedded.planos});
		});
	}



	componentDidMount() {
		this.loadClientes();
		this.loadPlanos();
		this.loadFromServer(this.state.pageSize);
		document.body.classList.remove('sidebar-collapse'); 

	}
	
	buscarCampo(campo, busca) {
		
		var field = campo.charAt(0).toLowerCase() + campo.slice(1)
		
		client({
			method: 'GET',
			path: 'api/pagamentos/search/findBy'+campo+'ContainingIgnoreCase?'+field+'='+busca,
			headers: {'Content-Type': 'application/json'}
		}).then(pagamentoCollection => {
			this.setState({
				pagamentos: pagamentoCollection.entity._embedded.pagamentos});
			return pagamentoCollection.entity._embedded.pagamentos;
		}).done( pagamentos=>{			
			if(pagamentos.length == 0){
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
                            <li className="breadcrumb-item active">Pagamentos</li>
                            </ol>
                        </div>{/* /.col */}
                        </div> {/* /.row */}
                    </div> {/* /.container-fluid */}
                </div>

                <div className="content">

					<div className="container">

						{this.state.showMessageAdd == true && this.state.success == true && <div className="form-group alert alert-success " >Pagamento adicionado!</div>}
						{this.state.showMessageAdd == true && this.state.success == false && <div className="form-group alert alert-warning " >Ocorreu um problema. O Pagamento não pôde ser adicionado!</div>}
						{this.state.showMessageDelete == true && this.state.success == true && <div className="form-group alert alert-success " >Pagamento excluído!</div>}
						{this.state.showMessageDelete == true && this.state.success == false && <div className="form-group alert alert-warning " >Ocorreu um problema. O Pagamento não pôde ser excluído!</div>}



						<Tabs defaultActiveKey="ativas" id="uncontrolled-tab-example">
							<Tab eventKey="ativas" title="Pagamentos">





								<AddDialog

									clientes={this.state.clientes}
									planos={this.state.planos}
									attributes={this.props.attributes}
									onUpdate={this.props.onUpdate}
									onCreate={this.onCreate}
								/>  
					
								<PagamentoList
									pagamentos={this.state.pagamentos}
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
		this.state = {modal:  false, clientePagamento: '', planoPagamento: ''};
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}
	
	handleClose(){
		 this.setState({ modal: false });
	}
	
	handleShow(e){
		e.preventDefault();

		this.loadClientePagamento(this.props.pagamento._links.cliente.href);
		this.loadPlanoPagamento(this.props.pagamento._links.plano.href);


		this.setState({ modal: true });
	}


	loadClientePagamento(url) {

		client({
			method: 'GET',
			path: url,
			headers: {'Accept': 'application/hal+json'}
		}).then(response => {
			var cliente = response.entity;
			return cliente;
		}).done(cliente => {
		this.setState({
			clientePagamento: cliente.nome});
		});

	}

	loadPlanoPagamento(url) {

		client({
			method: 'GET',
			path: url,
			headers: {'Accept': 'application/hal+json'}
		}).then(response => {
			var plano = response.entity;
			return plano;
		}).done(plano => {
		this.setState({
			planoPagamento: plano.name});
		});

	}


	render() {

		const dialogId = "updatePagamento-" + this.props.pagamento._links.self.href;
		const { modal } = this.state;
		const { planoPagamento } = this.state;
		const { clientePagamento } = this.state;


		
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
						<Form.Group as={Col}  md="4" controlId="3">
									<Form.Label>Nome</Form.Label>
									<h5> {this.props.pagamento['name']} </h5> 			
								</Form.Group>


								<Form.Group as={Col}  md="4" controlId="3">
									<Form.Label>Data</Form.Label>
									<h5> {this.props.pagamento['data']} </h5> 			
								</Form.Group>

								<Form.Group as={Col}  md="4" controlId="3">
									<Form.Label>Valor</Form.Label>
									<h5> {this.props.pagamento['valor']} </h5> 			
								</Form.Group>


							</Form.Row>


							<Form.Row>
								<Form.Group as={Col}  md="4" controlId="3">
									<Form.Label>Status</Form.Label>
									<h5> {this.props.pagamento['status']} </h5> 			
								</Form.Group>


								<Form.Group as={Col}  md="4" controlId="4">
									<Form.Label>Plano</Form.Label>
									<h5>  { planoPagamento }</h5> 			
								</Form.Group>

								<Form.Group as={Col}  md="4" controlId="5">
									<Form.Label>Cliente</Form.Label>
									<h5>  { clientePagamento } </h5> 			
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
			const newPagamento = {};
			
			newPagamento['name'] = ReactDOM.findDOMNode(this.refs['name']).value.trim();
			newPagamento['data'] = ReactDOM.findDOMNode(this.refs['data']).value.trim();
			newPagamento['valor'] = ReactDOM.findDOMNode(this.refs['valor']).value.trim();
			newPagamento['status'] = ReactDOM.findDOMNode(this.refs['status']).value.trim();
			newPagamento['plano']  = ReactDOM.findDOMNode(this.refs['plano']).value.trim();
			newPagamento['cliente']  = ReactDOM.findDOMNode(this.refs['cliente']).value.trim();




			this.props.onCreate(newPagamento);

			this.setState({ validated: false });
			this.setState({ modal: false });

			
			ReactDOM.findDOMNode(this.refs['name']).value = '';
			ReactDOM.findDOMNode(this.refs['data']).value = '';
			ReactDOM.findDOMNode(this.refs['valor']).value = '';
			ReactDOM.findDOMNode(this.refs['status']).value = '';
			ReactDOM.findDOMNode(this.refs['plano']).value = '';
			ReactDOM.findDOMNode(this.refs['cliente']).value = '';




		}


	}


	render() {

		const { validated } = this.state;
		const dialogId = "addPagamento";
		const { modal } = this.state;

		const clientes = this.props.clientes.map(cliente =>{
			return  <option key={cliente.name} value={cliente._links.self.href}> {cliente.nome}</option>
		});

		const planos = this.props.planos.map(plano =>{
			return  <option key={plano.name} value={plano._links.self.href}> {plano.name}</option>
		});
		
		return (
			<div key={dialogId}>



					<Row>

						<Form.Group as={Col} md="9" controlId="4">

						</Form.Group>	

						<Form.Group as={Col} md="3" controlId="5">
							<Form.Label>&nbsp; &nbsp;</Form.Label>
							<div key="botao">
								<Button onClick={this.handleShow} variant="primary" type="button">
									Adicionar Pagamento <i className="fas fa-plus-square"></i>
								</Button>	
							</div>
						</Form.Group>			

					</Row>


					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Adicionar Pagamento</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

						<Form name = "addForm"
								noValidate
								validated={validated}
								onSubmit={e => this.handleSubmit(e)} >

								<Form.Row>
									<Form.Group as={Col} md="8" controlId="1">
										<Form.Label>Nome do Pagamento</Form.Label>
										<div key="name">
											<Form.Control required type="text"   placeholder="Nome do Pagamento" ref="name" />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o Nome do Pagamento.
											</Form.Control.Feedback>
										</div>
									</Form.Group>


									<Form.Group as={Col} md="4" controlId="1">
										<Form.Label>Data</Form.Label>
										<div key="data">
											<MaskedFormControl required placeholder="DD/MM/AAAA"  ref="data" mask='11-11-1111' />

											<Form.Control.Feedback type="invalid">
												Por favor escreva a Data do Pagamento.
											</Form.Control.Feedback>
										</div>
									</Form.Group>
								</Form.Row>


								<Form.Row>
									<Form.Group as={Col} md="6" controlId="1">
										<Form.Label>Valor do Pagamento (R$)</Form.Label>
										<div key="valor">
											<MaskedFormControl required  placeholder="R$ - Valor do Pagamento" ref="valor" mask='1111.1111'/>
											<Form.Control.Feedback type="invalid">
												Por favor escreva o Valor do Pagamento.
											</Form.Control.Feedback>
										</div>
									</Form.Group>


									<Form.Group as={Col}  md="6" controlId="5">
									<Form.Label>Status do Pagamento</Form.Label>
									<div key="status">
										<Form.Control as="select" required placeholder="Status do Pagameno"   ref="status">
											<option>Escolha o status...</option>

											<option>Aguardando</option>
											<option>Em Andamento</option>		
											<option>Confirmando</option>
											<option>Efetuado</option>


										</Form.Control>
										<Form.Control.Feedback type="invalid">
										Por favor escreva o Status do Pagamento.
										</Form.Control.Feedback>
									</div>
								</Form.Group>
								</Form.Row>


								<Form.Row>

								<Form.Group as={Col}  md="6" controlId="5">
										<Form.Label>Plano</Form.Label>
										<div key="plano">
											<Form.Control as="select" required placeholder="Plano do Pagamento"   ref="plano">
											<option>Escolha o plano...</option>

												{planos}


											</Form.Control>
											<Form.Control.Feedback type="invalid">
												 Por favor escolha o Plano.
											</Form.Control.Feedback>
										</div>
									</Form.Group>



									<Form.Group as={Col}  md="6" controlId="5">
										<Form.Label>Cliente</Form.Label>
										<div key="cliente">
											<Form.Control as="select" required placeholder="Cliente do Pagamento"   ref="cliente">
											<option>Escolha o cliente...</option>

												{clientes}


											</Form.Control>
											<Form.Control.Feedback type="invalid">
												 Por favor escolha o Cliente.
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


class PagamentoList extends React.Component {

	constructor(props) {
		super(props);		
    }
	
	

	render() {
		const pagamentos = this.props.pagamentos.map(pagamento =>{
			return  <Pagamento key={pagamento._links.self.href} pagamento={pagamento} state={this.state} attributes={this.props.attributes} 
			 onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}  status={this.props.status} />
		});


		
		return (
				
			<div>				
		    	<Table>
					<tbody>
						<tr>
                            <th>#</th>
							<th>Nome</th>
							<th>Data</th>
							<th>Status</th>
							<th>Valor</th>
							<th>Cliente</th>
							<th>Plano</th>

							<th>Detalhes</th>
							<th>Excluir</th>	
						</tr>
						{pagamentos}
					</tbody>
				</Table>
			</div>
		)
	}
}


class Pagamento extends React.Component {

	constructor(props) {
		super(props);
		this.state = {clientePagamento:  "", planoPagamento: ""};

	}



	loadClientePagamento(url) {

		client({
			method: 'GET',
			path: url,
			headers: {'Accept': 'application/hal+json'}
		}).then(response => {
			var cliente = response.entity;
			return cliente;
		}).done(cliente => {
		this.setState({
			clientePagamento: cliente.nome});
		});

	}

	loadPlanoPagamento(url) {

		client({
			method: 'GET',
			path: url,
			headers: {'Accept': 'application/hal+json'}
		}).then(response => {
			var plano = response.entity;
			return plano;
		}).done(plano => {
		this.setState({
			planoPagamento: plano.name});
		});

	}


	componentDidMount(){

		this.loadClientePagamento(this.props.pagamento._links.cliente.href);
		this.loadPlanoPagamento(this.props.pagamento._links.plano.href);

	}
	

	render() {


		const { planoPagamento } = this.state;
		const { clientePagamento } = this.state;

		return (
				
				<tr>
	
	                <td>{this.props.pagamento.id}</td>
					<td>{this.props.pagamento.name}</td>
					<td>{this.props.pagamento.data}</td>
					<td>{this.props.pagamento.status}</td>
					<td>{this.props.pagamento.valor}</td>
					<td>{ clientePagamento }</td>
					<td>{ planoPagamento }</td>




	                <td>  
						<UpdateDialog pagamento={this.props.pagamento}
						  attributes={this.props.attributes}
						  onUpdate={this.props.onUpdate}
						  status={this.props.status}
						/>  
	                </td>
						
					<td> 
						<DeleteConfirmationDialog pagamento={this.props.pagamento}
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
		this.props.onDelete(this.props.pagamento);
	}



	render() {

		const dialogId = "addPagamento"+this.props.pagamento.id;
		const { modal } = this.state;
		
		return (
			<div key={dialogId}>




					<Button onClick={this.handleShow} variant="primary" type="button">
						<i className="fas fa-trash-alt"></i>
					</Button>	
	


					<Modal show={modal} onHide={this.handleClose} size="lg">
				        <Modal.Header closeButton>
				          <Modal.Title>Excluir Pagamento</Modal.Title>
				        </Modal.Header>
						
						<Modal.Body>

						<Form name = "deleteForm"
								onSubmit={e => this.handleSubmit(e)} >

							
							Tem certeza que deseja excluir o Pagamento?
							
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









class Pagamentos extends Component {


  render() {
    return (
		<Wrapper>
			<App/>
		</Wrapper>
    );
  }
}

export default Pagamentos;
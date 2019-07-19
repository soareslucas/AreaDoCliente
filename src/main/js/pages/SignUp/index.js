import React, { Component } from "react";

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
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	// tag::follow-2[]
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
	// end::follow-2[]

	// tag::create[]
	onCreate(newEscritorio) {     

		follow(client, root, ['escritorios']).then(escritorioCollection => {
			return client({
				method: 'POST',
				path: escritorioCollection.entity._links.self.href,
				entity: newEscritorio,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [
				{rel: 'escritorios', params: {'size': this.state.pageSize}}]);
		}).done(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}
	// end::create[]

	// tag::delete[]
	onDelete(escritorio) {
		client({method: 'DELETE', path: escritorio._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}
	// end::delete[]

	// tag::navigate[]
	onNavigate(navUri) {
		client({method: 'GET', path: navUri}).done(escritorioCollection => {
			this.setState({
				escritorios: escritorioCollection.entity._embedded.escritorios,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				links: escritorioCollection.entity._links
			});
		});
	}
	// end::navigate[]

	// tag::update-page-size[]
	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}
	// end::update-page-size[]

	// tag::follow-1[]
	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}
	// end::follow-1[]

	render() {
		return (
			<div>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
			</div>
		)
	}
}



// tag::create-dialog[]
class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);    
		this.state = { validated: false };    
		this.state = { show: false };
		this.state = { modal: false };
		
		this.state = { recebeCitacao: false };
		this.state = { possuiAdvogado: false };
		
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);

	}

	handleClose() {
		this.setState({ modal: false});
	}

	handleShow() {
		this.setState({ modal: true});
	}
	
	
	onRecebeCitacao() {
		
		if (this.state.recebeCitacao == true){
			this.setState({ recebeCitacao: false});
		}else{
			this.setState({ recebeCitacao: true});
		}
		
	}
	
	
	onPossuiAdvogado() {
		
		if (this.state.possuiAdvogado == true){
			this.setState({ possuiAdvogado: false});
		}else{
			this.setState({ possuiAdvogado: true});
		}
		
	}


	handleSubmit(e) {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ validated: true });

		} else{
			e.preventDefault();
			const newEscritorio = {};
			this.props.attributes.forEach(attribute => {
				console.log(attribute)
				newEscritorio[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
			});
			
			
			newEscritorio['possuiAdvogado'] = this.state.possuiAdvogado;
			newEscritorio['recebeCitacao'] = this.state.recebeCitacao;

			
			this.props.onCreate(newEscritorio);

			// clear out the dialog's inputs
			this.props.attributes.forEach(attribute => {
				ReactDOM.findDOMNode(this.refs[attribute]).value = '';
			});

			this.setState({ validated: false });
            this.setState({ show: true});


		}



	}

	render() {
		const { validated } = this.state;
        const { show } = this.state;
		const { modal } = this.state;

		return (

			<div>




					<div> 
						<Alert show={show} variant="success">
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

					<Breadcrumb>
						<Breadcrumb.Item href="/">Início</Breadcrumb.Item>
						<Breadcrumb.Item active href="SignUp">Inscrição</Breadcrumb.Item>
					</Breadcrumb>
					
					
					<Form.Row> 
					<Form.Group as={Col} md="8" controlId="9">
						<Form.Label>Nome do Advogado</Form.Label>
						<div key="advogadoMaster">
							<Form.Control required type="text"  placeholder="Advogado Master" ref="advogadoMaster"/>
							<Form.Control.Feedback type="invalid">
								Por favor escreva o nome do Advogado Master.
							</Form.Control.Feedback>
						</div>
					</Form.Group>


					<Form.Group as={Col} md="4" controlId="formGridEmail">
						<Form.Label>E-mail</Form.Label>
						<div key="emailMaster">
							<Form.Control required type="email" placeholder="E-mail do Master" ref="emailMaster" />      
							<Form.Control.Feedback type="invalid">
								Por favor escreva o e-mail do Master com o padrão email@dominio.com
							</Form.Control.Feedback>                                                                      
						</div>
					</Form.Group>


				</Form.Row>


				<Form.Row>

					<Form.Group as={Col}  md="4" controlId="6">
						<Form.Label>OAB ou Matricula</Form.Label>
						<div key="identificacaoMaster">
							<Form.Control required placeholder="Identificação do Master" ref="identificacaoMaster" />
							<Form.Control.Feedback type="invalid">
								Por favor escreva uma identificação do Advogado Master.
							</Form.Control.Feedback>
						</div>
					</Form.Group>

					<Form.Group controlId="formBasicChecbox">
						<div key="recebeCitacao">
							<Form.Check id="recebeCitacao" value="" ref="recebeCitacao" onClick={this.onRecebeCitacao} type="checkbox" label="Recebe Intimação?" />
						</div>
					</Form.Group>
				</Form.Row>

					<Modal show={modal} onHide={this.handleClose}>
						<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
						</Modal.Header>
						<Modal.Body>

						</Modal.Body>
						<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={this.handleClose}>
							Salvar
						</Button>
						</Modal.Footer>
					</Modal>

					<Form.Row>
						<Form.Group as={Col}  md="4" controlId="1">
							<Form.Label>CNPJ</Form.Label>
							<div key="cnpj">
								<MaskedFormControl required placeholder="xx.xxx.xxx/0001-xx"  ref="cnpj" mask='11.111.111/1111-11' />
								<Form.Control.Feedback type="invalid">
									Por favor escreva o CNPJ da Empresa/Órgão.
								</Form.Control.Feedback>
								
							</div>
						</Form.Group>

						<Form.Group as={Col} md="8" controlId="2">
							<Form.Label>Nome do Órgão ou Empresa</Form.Label>
							<div key="nome">
								<Form.Control required type="text"   placeholder="Nome do Órgão ou Empresa" ref="nome" />
								<Form.Control.Feedback type="invalid">
									Por favor escreva o Nome do Escritório Jurídico.
								</Form.Control.Feedback>
							</div>
						</Form.Group>
					</Form.Row>

					<Form.Row>
					
						<Form.Group as={Col}   md="12" controlId="3">
							<Form.Label>Endereço</Form.Label>
							<div key="endereco">
								<Form.Control required placeholder="Endereço do Órgão ou Empresa" ref="endereco"/>
								<Form.Control.Feedback type="invalid">
									Por favor escreva o endereço do Escritório Jurídico.
								</Form.Control.Feedback>
							</div>
						</Form.Group>
					</Form.Row>


					<Form.Row>

						<Form.Group as={Col}  md="6" controlId="4">
							<Form.Label>Nome do Representante Legal</Form.Label>
							<div key="nomeRepresentante">
								<Form.Control required placeholder="Nome do Representante Legal"   ref="nomeRepresentante"/>
								<Form.Control.Feedback type="invalid">
									Por favor escreva o Nome do Representante Legal.
								</Form.Control.Feedback>
							</div>
						</Form.Group>

						<Form.Group as={Col}  md="6" controlId="5">
							<Form.Label>Vínculo</Form.Label>
							<div key="vinculo">
								<Form.Control as="select" required placeholder="Vínculo"   ref="vinculo">
									<option>Escolha...</option>
									<option>Advogado</option>
									<option>Gestor</option>		
									<option>Procurador</option>
									<option>Proprietário</option>


								</Form.Control>
								<Form.Control.Feedback type="invalid">
									Por favor selecione qual o vínculo do responsável com o órgão.
								</Form.Control.Feedback>
							</div>
						</Form.Group>
					</Form.Row>


							
					<Form.Row>
					
					
						<Form.Group as={Col}  md="4" controlId="1">
							<Form.Label>CNPJ</Form.Label>
							<div key="cpf">
								<MaskedFormControl required placeholder="xxx.xxx.xxx-xx"  ref="cpf" mask='111.111.111-11' />
								<Form.Control.Feedback type="invalid">
									Por favor escreva o CPF da Empresa/Órgão.
								</Form.Control.Feedback>
								
							</div>
						</Form.Group>

						<Form.Group as={Col}  md="4" controlId="6">
							<Form.Label>Telefone</Form.Label>
							<div key="telefone">
								<MaskedFormControl required placeholder="(XX)-XXXXX-XXXX" ref="telefone" mask='11-11111-1111' />
								<Form.Control.Feedback type="invalid">
									Por favor escreva pelo menos um telefone de contato com o responsável.
								</Form.Control.Feedback>
							</div>
						</Form.Group>

						<Form.Group as={Col}   md="4" controlId="7">
							<Form.Label>Celular</Form.Label>
							<div key="celular">
								<MaskedFormControl placeholder="(XX)-XXXXX-XXXX" ref="celular" mask='11-11111-1111' />
							</div>
						</Form.Group>
					</Form.Row>



					
					<Form.Row>
						<Form.Group as={Col}  md="4" controlId="formGridEmail">
							<Form.Label>E-mail</Form.Label>
							<div key="email">
								<Form.Control required type="email" placeholder="E-mail" ref="email" />      
								<Form.Control.Feedback type="invalid">
									Por favor escreva o e-mail com o padrão email@dominio.com
								</Form.Control.Feedback>                                                                      
							</div>
						</Form.Group>
						
						
						<fieldset>
							<Form.Group as={Row}>
							<Form.Label as="legend" column sm={2}>
								Possui Advogado Estabelecido?
							</Form.Label>
		
								<Col sm={10}>
									<div key="possuiAdvogado">
										<Form.Check
										ref="possuiAdvogado"
										type="radio"
										label="Sim"
										name="possuiAdvogado"
										id="formHorizontalRadios1"
										onClick={this.onRecebeCitacao}
										/>
										<Form.Check
										ref="possuiAdvogado"
										type="radio"
										label="Não"
										name="possuiAdvogado"
										id="formHorizontalRadios2"
										/>
									</div>
							</Col>
							</Form.Group>
						</fieldset>
					
					</Form.Row>
					


					<Row>
						<Col md="10">
						</Col>
						<Col md="2">
							<Button variant="primary"  type="submit">
								Gravar pré-cadastro 
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		)
	}

}





class SignUp extends Component {


  render() {
    return (
                <Header>
                    <AppSignUp/>
                </Header>
    );
  }
}

export default SignUp;
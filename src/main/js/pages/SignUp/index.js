import React, { Component } from "react";
import { useState } from 'react';	
const ReactDOM = require('react-dom');
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Alert = require("react-bootstrap/Alert")
import MaskedFormControl from 'react-bootstrap-maskedinput';
import follow from '../../follow';
import client from '../../client';
import { Link } from "react-router-dom";
import Header from '../../common/header';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import axios from 'axios'
import Wrapper from "../../common/wrapper";


const root = '/api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {clientes: [], attributes: [], pageSize: 2, links: {}};
		this.onCreate = this.onCreate.bind(this);
	}

	onCreate(newCliente) {     
			client({
				method: 'POST',
				path: 'api/clientes',
				entity: newCliente,
				headers: {'Content-Type': 'application/json'}
			});
	}

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
		this.state = { validated: false, alerta: false, possuiAdvogado: false, mostra: false , clientes: [], existe: false};    
		this.onPossuiAdvogadoTrue = this.onPossuiAdvogadoTrue.bind(this);
		this.onPossuiAdvogadoFalse = this.onPossuiAdvogadoFalse.bind(this);
		this.handleUploadFile = this.handleUploadFile.bind(this);
		this.verificaCnpj = this.verificaCnpj.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);    

	}
	
	verificaCnpj(cnpj) {
		client({
			method: 'GET',
			path: 'api/clientes/search/findBycnpj?cnpj='+cnpj,
			headers: {'Content-Type': 'application/json'}
		}).then(clienteCollection => {
			this.setState({
				clientes: clienteCollection.entity._embedded.clientes});
			return clienteCollection.entity._embedded.clientes;
		}).done( clientes=>{			
			if(clientes.length == 0){
				this.setState({ existe: false});
			}else{
				this.setState({ existe: true});
			}
		});	
	}

	onPossuiAdvogadoTrue()	{
		this.setState({ possuiAdvogado: true });
		this.setState({ mostra: true});

 	}

	onPossuiAdvogadoFalse(){
		this.setState({ possuiAdvogado: false });
		this.setState({ mostra: false });

	}
	
	handleUploadFile(e) {
        const data = new FormData();

        console.log("Uploading file", e.target.files[0]);
        data.append('file', e.target.files[0]);

		axios.post('upload', data, {
		    headers: {
		      'Content-Type': 'multipart/form-data'
		    }
		}).then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                console.log("Upload error. HTTP error/status code=",error.response.status);
            } else {
               console.log("Upload error. HTTP error/status code=",error.message);
            }
        });
    };


	handleSubmit(e) {
		
		e.preventDefault();
		const form = e.currentTarget;

		var cnpj = '';
		cnpj = ReactDOM.findDOMNode(this.refs['cnpj']).value.trim();
		this.verificaCnpj(cnpj);
		
		if(!this.state.existe){
			
			if (form.checkValidity() === false) {
				e.preventDefault();
				e.stopPropagation();
				this.setState({ validated: true });

			} else{
				const newCliente = {};

				console.log(ReactDOM.findDOMNode(this.refs['recebeCitacao']).checked);
				console.log(ReactDOM.findDOMNode(this.refs['possuiAdvogado']).value);
				
				newCliente['manager'] = ReactDOM.findDOMNode(this.refs['manager']).value.trim();
				newCliente['status'] = ReactDOM.findDOMNode(this.refs['status']).value.trim();
				newCliente['cnpj'] = ReactDOM.findDOMNode(this.refs['cnpj']).value.trim();
				newCliente['nome'] = ReactDOM.findDOMNode(this.refs['nome']).value.trim();
				newCliente['endereco'] = ReactDOM.findDOMNode(this.refs['endereco']).value.trim();
				newCliente['nomeRepresentante'] = ReactDOM.findDOMNode(this.refs['nomeRepresentante']).value.trim();
				newCliente['vinculo'] = ReactDOM.findDOMNode(this.refs['vinculo']).value.trim();
				newCliente['cpf'] = ReactDOM.findDOMNode(this.refs['cpf']).value.trim();
				newCliente['celular'] = ReactDOM.findDOMNode(this.refs['celular']).value.trim();
				newCliente['telefone'] = ReactDOM.findDOMNode(this.refs['telefone']).value.trim();
				newCliente['email'] = ReactDOM.findDOMNode(this.refs['email']).value.trim();
				newCliente['possuiAdvogado'] = ReactDOM.findDOMNode(this.refs['possuiAdvogado']).value.trim();
				newCliente['advogadoMaster'] = ReactDOM.findDOMNode(this.refs['advogadoMaster']).value.trim();
				newCliente['emailMaster'] = ReactDOM.findDOMNode(this.refs['emailMaster']).value.trim();
				newCliente['identificacaoMaster'] = ReactDOM.findDOMNode(this.refs['identificacaoMaster']).value.trim();
				newCliente['recebeCitacao'] = ReactDOM.findDOMNode(this.refs['recebeCitacao']).checked
				
				this.props.onCreate(newCliente);

				this.setState({ validated: false });
				this.setState({ alerta: true });
				
				ReactDOM.findDOMNode(this.refs['manager']).value = '';
				ReactDOM.findDOMNode(this.refs['status']).value = '';
				ReactDOM.findDOMNode(this.refs['cnpj']).value = '';
				ReactDOM.findDOMNode(this.refs['nome']).value = '';
				ReactDOM.findDOMNode(this.refs['endereco']).value = '';
				ReactDOM.findDOMNode(this.refs['nomeRepresentante']).value = '';
				ReactDOM.findDOMNode(this.refs['vinculo']).value = '';
				ReactDOM.findDOMNode(this.refs['cpf']).value = '';
				ReactDOM.findDOMNode(this.refs['celular']).value = '';
				ReactDOM.findDOMNode(this.refs['telefone']).value = '';
				ReactDOM.findDOMNode(this.refs['email']).value = '';
				ReactDOM.findDOMNode(this.refs['possuiAdvogado']).value = '';
				ReactDOM.findDOMNode(this.refs['advogadoMaster']).value = '';
				ReactDOM.findDOMNode(this.refs['emailMaster']).value = '';
				ReactDOM.findDOMNode(this.refs['identificacaoMaster']).value = '';
				ReactDOM.findDOMNode(this.refs['recebeCitacao']).checked = false;

			}
		}




	}

	render() {
		const { validated } = this.state;
		const { possuiAdvogado } = this.state;
		const { alerta } = this.state;
		const { mostra } = this.state;

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
                            <li className="breadcrumb-item active">Cadastro</li>
                            </ol>
                        </div>{/* /.col */}
                        </div> {/* /.row */}
                    </div> {/* /.container-fluid */}
                </div>
		
		        


                <div className="content">
                    <div className="container">

					{this.state.existe && <div className="alert alert-warning">CNPJ já possui solicitação de cadastro!</div>}

					<div> 
		            <Alert show={alerta} variant="success">
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

									<input ref="manager" type="hidden" name="manager" value="" />
									<input ref="status" type="hidden" name="status" value="" />

									{/* <input ref="" type="hidden" name="possuiAdvogado" value="" /> */}

								<Form.Row>
									<Form.Group as={Col}  md="4" controlId="1">
										<Form.Label>CNPJ</Form.Label>
										<div key="cnpj">
											<MaskedFormControl required placeholder="xx.xxx.xxx/xxxx-xx"  ref="cnpj" mask='11.111.111/1111-11' />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o CNPJ da Empresa/Órgão.
											</Form.Control.Feedback>
											
										</div>
									</Form.Group>

									<Form.Group as={Col} md="8" controlId="2">
										<Form.Label>Nome da Empresa</Form.Label>
										<div key="nome">
											<Form.Control required type="text"   placeholder="Nome da Empresa" ref="nome" />
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
											<Form.Control required placeholder="Endereço da Empresa" ref="endereco"/>
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
										<Form.Label>Vínculo do Representante Legal</Form.Label>
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
										<Form.Label>CPF do Representante Legal</Form.Label>
										<div key="cpf">
											<MaskedFormControl required placeholder="xxx.xxx.xxx-xx"  ref="cpf" mask='111.111.111-11' />
											<Form.Control.Feedback type="invalid">
												Por favor escreva o CPF do Representante Legal.
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
									
									<Form.Group as={Col}  md="4" controlId="file">
										<Form.Label>Anexar Arquivo Comprobatório</Form.Label>
										<div key="file">
											<Form.Control required type="file"  onChange={this.handleUploadFile} />                                                                     
											<Form.Control.Feedback type="invalid">
												Por favor insira um arquivo comprobatório da representação legal.
											</Form.Control.Feedback>   
										</div>
									</Form.Group>
										
									
									<Form.Group as={Col}  md="4">
										<Form.Label> Possui Advogado Estabelecido? </Form.Label>
											
										<input ref="possuiAdvogado" type="hidden" name="possuiAdvogado" value={possuiAdvogado} />

										<Col sm={10}>
											<div key="possuiAdvogado">
												<Form.Check
												type="radio"
												label="Sim"
												name="formHorizontalRadios1"
												id="formHorizontalRadios1"
												onClick={this.onPossuiAdvogadoTrue}
												/>
												<Form.Check
												type="radio"
												label="Não"
												name="formHorizontalRadios1"
												id="formHorizontalRadios2"
												onClick={this.onPossuiAdvogadoFalse}
												/>
											</div>
										</Col>
									</Form.Group>
								
								</Form.Row>
								
								
								
								
								<div style={{display: mostra ? 'block' : 'none' }} > 
								
									<Form.Row> 
										<Form.Group as={Col} md="8" controlId="9">
											<Form.Label>Nome do Advogado Principal</Form.Label>
											<div key="advogadoMaster">
												<Form.Control  type="text"  placeholder="Advogado Master" ref="advogadoMaster"/>
												<Form.Control.Feedback type="invalid">
													Por favor escreva o nome do Advogado Principal.
												</Form.Control.Feedback>
											</div>
										</Form.Group>
					
					
										<Form.Group as={Col} md="4" controlId="formGridEmail">
											<Form.Label>E-mail do Advogado Principal</Form.Label>
											<div key="emailMaster">
												<Form.Control  type="email" placeholder="E-mail do Master" ref="emailMaster" />      
												<Form.Control.Feedback type="invalid">
													Por favor escreva o e-mail do Master com o padrão email@dominio.com
												</Form.Control.Feedback>                                                                      
											</div>
										</Form.Group>
									</Form.Row>
					
					
									<Form.Row>
					
										<Form.Group as={Col}  md="4" controlId="6">
											<Form.Label>OAB ou Matrícula</Form.Label>
											<div key="identificacaoMaster">
												<Form.Control  placeholder="Número da Identificação do Advogado Principal" ref="identificacaoMaster" />
												<Form.Control.Feedback type="invalid">
													Por favor escreva uma identificação do Advogado Principal.
												</Form.Control.Feedback>
											</div>
										</Form.Group>
					
										<Form.Group controlId="formBasicChecbox">
											<div key="recebeCitacao">
												<Form.Check id="recebeCitacao" ref="recebeCitacao" type="checkbox" label="Recebe Intimação?" />
											</div>
										</Form.Group>
									</Form.Row>
								
								
								</div>
								


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
					</div>
				</div>
		)
	}

}





class SignUp extends Component {


  render() {
    return (
                <Wrapper>
                    <App/>
                </Wrapper>
    );
  }
}

export default SignUp;

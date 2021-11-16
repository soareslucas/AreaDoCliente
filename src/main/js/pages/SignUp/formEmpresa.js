import React, { Component } from "react";
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
import axios from 'axios'
import Wrapper from "../../common/wrapper";


const root = '/api';

class FormEmpresa extends React.Component {


	constructor(props) {
		super(props);
        this.state = { seguimentos:[] ,  validated: false,  mostra: false ,  existe: false};    
        this.verificaCnpj = this.verificaCnpj.bind(this);   
        this.handleNextStep = this.handleNextStep.bind(this);          
	}

    componentDidMount() {
		this.loadSeguimentos();
	}

	loadSeguimentos() {
		follow(client, root, [
			{rel: 'seguimentos'}]
		).then(seguimentoCollection => {
			return client({
				method: 'GET',
				path: seguimentoCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return seguimentoCollection;
			});
		}).done(seguimentoCollection => {
			this.setState({
				seguimentos: seguimentoCollection.entity._embedded.seguimentos});
		});
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


    handleChangeFormEmpresa(e){
		this.props.handleChange(e);        
    }



    handleNextStep(){

        //const {inputValues : {  cnpj, nome, endereco, nomeRepresentante, cpf, celular, telefone, email, seguimento }} = this.props;

        var cnpj = this.props.inputValues;

        console.log(cnpj);

        this.verificaCnpj(cnpj);
		
		if(!this.state.existe){
            this.props.nextStep();
        }

    }

    

    render(){

        const { validated } = this.state;
		const { mostra } = this.state;


		const seguimentos = this.state.seguimentos.map( seguimento => {
			return  <option key={seguimento.name} value={seguimento._links.self.href}> {seguimento.name}</option>
		});


		return(
			
            <Form
            noValidate
            validated={validated} >


                <Form.Row>
                    <Form.Group as={Col} md="8" controlId="2">
                            <Form.Label>Nome da Empresa</Form.Label>
                            <div key="nome">
                                <Form.Control required type="text"   placeholder="Nome da Empresa" ref="nome" defaultValue={this.props.inputValues.nome}    onChange={e => this.handleChangeFormEmpresa(e)} />
                                <Form.Control.Feedback type="invalid">
                                    Por favor escreva o Nome da Pessoa Jurídica.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                    <Form.Group as={Col}  md="4" controlId="1">
                        <Form.Label>CNPJ</Form.Label>
                        <div key="cnpj">
                            <MaskedFormControl required placeholder="xx.xxx.xxx/xxxx-xx"  name="cnpj" mask='11.111.111/1111-11' defaultValue={this.props.inputValues.cnpj}  onChange={e => this.handleChangeFormEmpresa(e)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o CNPJ da Empresa/Órgão.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}   md="8" controlId="3">
                        <Form.Label>Endereço</Form.Label>
                        <div key="endereco">
                            <Form.Control required placeholder="Rua, bairro, complemento, cidade e estado" ref="endereco" defaultValue={this.props.inputValues.endereco}   onChange={e => this.handleChangeFormEmpresa(e)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o endereço da Pessoa Jurídica.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group as={Col}   md="4" controlId="3">
                        <Form.Label>CEP</Form.Label>
                        <div key="cep">
                            <MaskedFormControl required placeholder="xx.xxx-xxx"  ref="cep" mask='11.111-111' defaultValue={this.props.inputValues.cep}  onChange={e => this.handleChangeFormEmpresa(e)} />

                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o endereço da Pessoa Jurídica.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}   md="6" controlId="3">
                        <Form.Label>Natureza Jurídica</Form.Label>
                        <div key="natureza">
                            <Form.Control as="select" required placeholder="Natureza Jurídica"   ref="natureza" defaultValue={this.props.inputValues.natureza}  onChange={e => this.handleChangeFormEmpresa(e)} >
                                    <option>Escolha...</option>
                                    <option>MEI</option>
                                    <option>EI</option>		
                                    <option>EIRELI</option>
                                    <option>Sociedade Anônima</option>
                                    <option>Sociedade Simples Limitada</option>
                                    <option>Sociedade Limitada Unipessoal</option>

                            </Form.Control>							

                            <Form.Control.Feedback type="invalid">
                                Por favor selecione a Natureza Jurídica da empresa.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group as={Col}  md="6" controlId="5">
                        <Form.Label>Seguimento</Form.Label>
                        <div key="seguimento">
                            <Form.Control as="select" required placeholder="Seguimento"   ref="seguimento" defaultValue={this.props.inputValues.seguimento}   onChange={e => this.handleChangeFormEmpresa(e)} >
                                <option>Escolha...</option>
                                    {seguimentos}


                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Por favor selecione qual o seguimento em que a empresa atua.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}  md="6" controlId="4">
                        <Form.Label>Nome do Representante Legal</Form.Label>
                        <div key="nomeRepresentante">
                            <Form.Control required placeholder="Nome do Representante Legal"   ref="nomeRepresentante" defaultValue={this.props.inputValues.nomeRepresentante}  onChange={e => this.handleChangeFormEmpresa(e)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o Nome do Representante Legal.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group as={Col}  md="6" controlId="5">
                        <Form.Label>Vínculo do Representante Legal</Form.Label>
                        <div key="vinculo">
                            <Form.Control as="select" required placeholder="Vínculo"   ref="vinculo" defaultValue={this.props.inputValues.vinculo}>
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
                            <MaskedFormControl required placeholder="xxx.xxx.xxx-xx"  ref="cpf" mask='111.111.111-11' defaultValue={this.props.inputValues.cpf} onChange={e => this.handleChangeFormEmpresa(e)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o CPF do Representante Legal.
                            </Form.Control.Feedback>
                            
                        </div>
                    </Form.Group>
                    <Form.Group as={Col}  md="4" controlId="6">
                        <Form.Label>Telefone</Form.Label>
                        <div key="telefone">
                            <MaskedFormControl required placeholder="(XX)-XXXXX-XXXX" ref="telefone" mask='11-11111-1111' defaultValue={this.props.inputValues.telefone}   onChange={e => this.handleChangeFormEmpresa(e)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva pelo menos um telefone de contato com o responsável.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                    <Form.Group as={Col}   md="4" controlId="7">
                        <Form.Label>Celular</Form.Label>
                        <div key="celular">
                            <MaskedFormControl placeholder="(XX)-XXXXX-XXXX" ref="celular" mask='11-11111-1111' defaultValue={this.props.inputValues.celular} onChange={e => this.handleChangeFormEmpresa(e)} />
                        </div>
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col}  md="4" controlId="formGridEmail">
                        <Form.Label>E-mail</Form.Label>
                        <div key="email">
                            <Form.Control required type="email" placeholder="E-mail" ref="email"  defaultValue={this.props.inputValues.email} onChange={e => this.handleChangeFormEmpresa(e)} />      
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o e-mail com o padrão email@dominio.com
                            </Form.Control.Feedback>                                                                      
                        </div>
                    </Form.Group>
                    
                    <Form.Group as={Col}  md="4" controlId="file">
                        <Form.Label>Anexar Arquivo Comprobatório</Form.Label>
                        <div key="file">
                            <Form.Control type="file"  onChange={this.handleUploadFile} />                                                                     
                            <Form.Control.Feedback type="invalid">
                                Por favor insira um arquivo comprobatório da representação legal.
                            </Form.Control.Feedback>   
                        </div>
                    </Form.Group>
                    <Form.Group as={Col}  md="4" controlId="botao">
                        <Button variant="primary"  onClick={this.handleNextStep}>
                            Gravar pré-cadastro 
                        </Button>
                    </Form.Group>                
                </Form.Row>

            </Form>
		);


    }
}



export default FormEmpresa;
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

class FormRepresentante extends React.Component {


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
        
        const centered = {display : 'flex', justifyContent: 'center'}
        const lefted = {display: 'flex', flexDirection: 'row-reverse'}

		return(
			
            <Form
            noValidate
            validated={validated} >


                <Form.Row  style={centered}>
                    <Form.Group as={Col}  md="6" >
                        <Form.Label>Nome do Representante Legal</Form.Label>
                        <div key="nomeRepresentante">
                            <Form.Control required placeholder="Nome do Representante Legal"   ref="nomeRepresentante" defaultValue={this.props.inputValues.nomeRepresentante}  onChange={e => this.handleChangeFormEmpresa(e)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o Nome do Representante Legal.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Form.Row>

                <Form.Row  style={centered}>
                    <Form.Group as={Col}  md="6" controlId="formGridEmail">
                        <Form.Label>E-mail</Form.Label>
                        <div key="email">
                            <Form.Control required type="email" placeholder="E-mail" ref="email"  defaultValue={this.props.inputValues.email} onChange={e => this.handleChangeFormEmpresa(e)} />      
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o e-mail com o padrão email@dominio.com
                            </Form.Control.Feedback>                                                                      
                        </div>
                    </Form.Group>
                </Form.Row>                

                <Form.Row  style={centered}>
                    <Form.Group as={Col}  md="6" >
                        <Form.Label>Telefone</Form.Label>
                        <div key="telefone">
                            <MaskedFormControl required placeholder="(XX)-XXXXX-XXXX" ref="telefone" mask='11-11111-1111' defaultValue={this.props.inputValues.telefone}   onChange={e => this.handleChangeFormEmpresa(e)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva pelo menos um telefone de contato com o responsável.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Form.Row>

                <Form.Row  style={centered}>                
                    <Form.Group as={Col}  md="6" >
                        <Form.Label>CPF do Representante Legal</Form.Label>
                        <div key="cpf">
                            <MaskedFormControl required placeholder="xxx.xxx.xxx-xx"  ref="cpf" mask='111.111.111-11' defaultValue={this.props.inputValues.cpf} onChange={e => this.handleChangeFormEmpresa(e)} />
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o CPF do Representante Legal.
                            </Form.Control.Feedback>
                            
                        </div>
                    </Form.Group>
                </Form.Row>

                <Form.Row  style={centered}>                
                   <Form.Group as={Col}  md="6" controlId="file">
                        <Form.Label>Anexar Arquivo Comprobatório</Form.Label>
                        <div key="file">
                            <Form.Control type="file"  onChange={this.handleUploadFile} />                                                                     
                            <Form.Control.Feedback type="invalid">
                                Por favor insira um arquivo comprobatório da representação legal.
                            </Form.Control.Feedback>   
                        </div>
                    </Form.Group>
                </Form.Row>
                
                <Form.Row  style={centered}>
                    <Form.Group style={lefted} as={Col}  md="6" controlId="botao">
                        <Button variant="primary"  onClick={this.handleNextStep}>
                            Próximo >
                        </Button>
                    </Form.Group>                
                </Form.Row>

            </Form>
		);


    }
}



export default FormRepresentante;
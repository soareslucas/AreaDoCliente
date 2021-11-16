import React, { Component } from "react";
const ReactDOM = require('react-dom');
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Alert = require("react-bootstrap/Alert")
import follow from '../../follow';
import client from '../../client';
import axios from 'axios'
import Wrapper from "../../common/wrapper";

import FormEmpresa from "./formEmpresa";
import Confirmacao from "./confirmacao";
import FormTipoCliente from "./formTipoCliente";


const root = '/api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { attributes: [], pageSize: 2, links: {} , alerta: false};
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

		const { alerta } = this.state;

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
									Seu solicitação será analisado pelo Departamento Comercial que fará a aprovação do cadastro. 
								</p>
							</Alert>
				
						</div>


						<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>

					</div>

			
				</div> 
		</div> 

		)
	}
}



// tag::create-dialog[]
class CreateDialog extends React.Component {

	
	constructor(props) {
		super(props);
		this.state = { step: 1, cnpj : "", nome: "teste teste", endereco : "", nomeRepresentante : "", cpf: "", celular: "", telefone: "", email: "", seguimento : ""	 };    
		this.handleUploadFile = this.handleUploadFile.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);    
		this.nextStep = this.nextStep.bind(this);    
		this.prevStep = this.prevStep.bind(this);    
		this.handleChange = this.handleChange.bind(this);    
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


	nextStep () {
		const { step } = this.state
        this.setState({
            step : step + 1
        });
    }

    prevStep(){
		const { step } = this.state
        this.setState({
            step : step - 1
        });
    }

    handleChange (event){

        this.setState({[event.target.name]: event.target.value});
    }


	handleSubmit(e) {
		
		e.preventDefault();
		const form = e.currentTarget;

			
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({ validated: true });

		} else{
			const newCliente = {};

			newCliente = this.inputValues;
			
			this.props.onCreate(newCliente);

			this.setState({ validated: false });
			this.setState({ alerta: true });
			

		}

	}

	render() {

		const { step, cnpj, nome, endereco, nomeRepresentante, cpf, celular, telefone, email, seguimento } = this.state;
        const inputValues = { cnpj, nome, endereco, nomeRepresentante, cpf, celular, telefone, email, seguimento };


		switch(step) {
			case 1:
				return <FormEmpresa
						nextStep={this.nextStep}
						handleChange = {this.handleChange}
						inputValues={inputValues}
						/>
			case 2:
				return <FormTipoCliente
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange = {this.handleChange}
						inputValues={inputValues}
						/>
			case 3:
				return <Confirmacao
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						inputValues={inputValues}
						/>
		}



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




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





class FormTipoCliente extends React.Component {


	constructor(props) {
		super(props);
        this.state = { validated: false};    
   
	}

    handleNextStep(){

        this.verificaCnpj(this.inputValues.cnpj);
		
		if(!this.state.existe){

            this.props.nextStep();
        }

    }

    

    render(){

        const { validated } = this.state;


		return(
			
            <Form
            noValidate
            validated={validated} >

                <input ref="status" type="hidden" name="status" value="" />


                <Form.Row>
                    <Form.Group as={Col} md="8" controlId="2">
                            <Form.Label>Nome da Empresa</Form.Label>
                            <div key="nome">
                                <Form.Control required type="text"   placeholder="Nome da Empresa" ref="nome" />
                                <Form.Control.Feedback type="invalid">
                                    Por favor escreva o Nome da Pessoa Jurídica.
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                    <Form.Group as={Col}  md="4" controlId="1">
                        <Form.Label>CNPJ</Form.Label>
                        <div key="cnpj">
                            <MaskedFormControl required placeholder="xx.xxx.xxx/xxxx-xx"  ref="cnpj" mask='11.111.111/1111-11' />
                            <Form.Control.Feedback type="invalid">
                                Por favor escreva o CNPJ da Empresa/Órgão.
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>
                </Form.Row>


                <Form.Row>

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



export default FormTipoCliente;
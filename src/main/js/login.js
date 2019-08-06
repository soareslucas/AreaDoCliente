import React, { Component } from 'react'
import AuthenticationService from './service/AuthenticationService';
import Header from './header';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
const Button = require("react-bootstrap/Button");







class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {

        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push('/admin')

                this.setState({ showSuccessMessage: true })

            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })


    }

    render() {
        return (
            <div>
            	<Header>
					
					<Breadcrumb>
						<Breadcrumb.Item href="/">Início</Breadcrumb.Item>
						<Breadcrumb.Item active href="Login">Login</Breadcrumb.Item>
					</Breadcrumb>	         
					
					<div className="container">

	                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
	                   
					    {this.state.hasLoginFailed && <div className="alert alert-warning">Usuário ou Senha incorretos!</div>}
	                   
					    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
	                   
						{/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
						

					<Form.Row>
			            
			            
						<Form.Group as={Col} md="5" controlId="2">
								<Form.Label>Usuário</Form.Label>
								<div key="username">
									<Form.Control required  type="text" name="username" onChange={this.handleChange} value={this.state.username} onChange={this.handleChange} />
									<Form.Control.Feedback type="invalid">
										Por favor escreva o usuário.
									</Form.Control.Feedback>
									
								</div>
						</Form.Group>

						<Form.Group as={Col} md="5" controlId="2">
								<Form.Label>Senha</Form.Label>
								<div key="password">
									<Form.Control required  type="password" name="password" onChange={this.handleChange} value={this.state.password} onChange={this.handleChange} />
									<Form.Control.Feedback type="invalid">
										Por favor escreva a senha.
									</Form.Control.Feedback>
									
								</div>
						</Form.Group>

						<Form.Group as={Col} md="2">
							<Form.Label></Form.Label>

								<div key="button">
									<Button onClick={this.loginClicked} variant="primary"  type="submit">
										Buscar 
									</Button>
									
								</div>

						</Form.Group>

					</Form.Row>

	                </div>
                </Header>
            </div>
        )
    }
}

export default Login
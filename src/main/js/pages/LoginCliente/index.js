import React, { Component } from 'react'
import AuthenticationService from '../../service/AuthenticationService';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
const Button = require("react-bootstrap/Button");
import { withRouter} from 'react-router-dom';



class LoginCliente extends Component {

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
			.then(response => {

				AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
				this.props.history.push('/admin')
				this.setState({ showSuccessMessage: true })

			})
			.catch(response =>{

				console.log(response)
				this.setState({ showSuccessMessage: false })
				this.setState({ hasLoginFailed: true })
			})





	}

	render() {


		return (
			<>
				{/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}

				{this.state.hasLoginFailed && <div className="alert alert-warning">Usuário ou Senha incorretos!</div>}
				
				{this.state.showSuccessMessage && <div>Login Sucessful</div>}
				
				{/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}

				<div className="login-page">
					<div className="login-box">
						<div className="login-logo">
							<a href="#"><b>Login</b> do Cliente</a>
						</div>
						{/* /.login-logo */}
						<div className="card">
							<div className="card-body login-card-body">
								{/* <p className="login-box-msg">Sign in to start your session</p> */}
								<form action="#" method="post">
									<div className="input-group mb-3">

										<Form.Control required type="text" placeholder="Usuário" name="username" onChange={this.handleChange} value={this.state.username} onChange={this.handleChange} />
										<Form.Control.Feedback type="invalid">
											Por favor escreva o usuário.
										</Form.Control.Feedback>
										<div className="input-group-append">
											<div className="input-group-text">
												<span className="fas fa-envelope" />
											</div>
										</div>
									</div>
									<div className="input-group mb-3">
										<Form.Control required type="password" placeholder="Senha" name="password" onChange={this.handleChange} value={this.state.password} onChange={this.handleChange} />
										<Form.Control.Feedback type="invalid">
											Por favor escreva a senha.
										</Form.Control.Feedback>
										<div className="input-group-append">
											<div className="input-group-text">
												<span className="fas fa-lock" />
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-8">
											<div className="icheck-primary">
												<input type="checkbox" id="remember" />
												<label htmlFor="remember">
													Lembre-se de mim
												</label>
											</div>
										</div>
										{/* /.col */}
										<div className="col-4">
											<button onClick={this.loginClicked} type="button" className="btn btn-primary btn-block">Login</button>
										</div>
										{/* /.col */}
									</div>
								</form>

							</div>
							{/* /.login-card-body */}
						</div>
					</div>
				</div>
			</>
		)
	}
}






export default withRouter(LoginCliente);

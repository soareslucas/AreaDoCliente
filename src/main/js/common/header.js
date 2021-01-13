import React, { Component, ReactComponent } from "react";
import { Link } from "react-router-dom";
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Nav = require("react-bootstrap/Nav")
const Badge = require("react-bootstrap/Badge")

import AuthenticationService from '../service/AuthenticationService';



class Header extends Component {
	constructor(props) {
		super(props);
		this.children = { validated: false };
		this.state = { logado: AuthenticationService.isUserLoggedIn() }

	}

	render() {
		return (
			<nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
				<div className="container">
					<a href="/" className="navbar-brand">
						<img src="../../dist/img/AdminLTELogo.png" alt="Área do Cliente" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
						<span className="brand-text font-weight-light">Área do Cliente</span>
					</a>
					<button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse order-3" id="navbarCollapse">
						{/* Left navbar links */}
						<ul className="navbar-nav">
							<li className="nav-item">
								<a href="/" className="nav-link">Início</a>
							</li>
							<li className="nav-item">
								<a href="/contact" className="nav-link">Suporte</a>
							</li>
							<li className="nav-item">
								<Link to="/admin" className="nav-link"> <i className="fas fa-user-cog"></i> Admin </Link>
							</li>
						</ul>
						{/* SEARCH FORM */}
						<form className="form-inline ml-0 ml-md-3">
							<div className="input-group input-group-sm">
								<input className="form-control form-control-navbar" type="search" placeholder="Pesquisar" aria-label="Search" />
								<div className="input-group-append">
									<button className="btn btn-navbar" type="submit">
										<i className="fas fa-search" />
									</button>
								</div>
							</div>
						</form>
					</div>
					{/* Right navbar links */}
					<ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
						{/* Messages Dropdown Menu */}
						<li className="nav-item dropdown">
							<a className="nav-link" data-toggle="dropdown" href="#">
								<i className="fas fa-comments" />
								<span className="badge badge-danger navbar-badge">3</span>
							</a>
							<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
								<a href="#" className="dropdown-item">
									{/* Message Start */}
									<div className="media">
										<img src="../../dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
										<div className="media-body">
											<h3 className="dropdown-item-title">
												Brad Diesel
							<span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
											</h3>
											<p className="text-sm">Call me whenever you can...</p>
											<p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
										</div>
									</div>
									{/* Message End */}
								</a>
								<div className="dropdown-divider" />
								<a href="#" className="dropdown-item">
									{/* Message Start */}
									<div className="media">
										<img src="../../dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
										<div className="media-body">
											<h3 className="dropdown-item-title">
												John Pierce
							<span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
											</h3>
											<p className="text-sm">I got your message bro</p>
											<p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
										</div>
									</div>
									{/* Message End */}
								</a>
								<div className="dropdown-divider" />
								<a href="#" className="dropdown-item">
									{/* Message Start */}
									<div className="media">
										<img src="../../dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
										<div className="media-body">
											<h3 className="dropdown-item-title">
												Nora Silvester
							<span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
											</h3>
											<p className="text-sm">The subject goes here</p>
											<p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
										</div>
									</div>
									{/* Message End */}
								</a>
								<div className="dropdown-divider" />
								<a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
							</div>
						</li>
						{/* Notifications Dropdown Menu */}
						<li className="nav-item dropdown">
							<a className="nav-link" data-toggle="dropdown" href="#">
								<i className="far fa-bell" />
								<span className="badge badge-warning navbar-badge">15</span>
							</a>
							<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
								<span className="dropdown-header">15 Notifications</span>
								<div className="dropdown-divider" />
								<a href="#" className="dropdown-item">
									<i className="fas fa-envelope mr-2" /> 4 new messages
						<span className="float-right text-muted text-sm">3 mins</span>
								</a>
								<div className="dropdown-divider" />
								<a href="#" className="dropdown-item">
									<i className="fas fa-users mr-2" /> 8 friend requests
						<span className="float-right text-muted text-sm">12 hours</span>
								</a>
								<div className="dropdown-divider" />
								<a href="#" className="dropdown-item">
									<i className="fas fa-file mr-2" /> 3 new reports
						<span className="float-right text-muted text-sm">2 days</span>
								</a>
								<div className="dropdown-divider" />
								<a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
							</div>
						</li>

						{/* Button Menu Admin */}
						<li className="nav-item">
							<a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button" alt="Área do Admin"><i className="fas fa-th-large" /></a>
						</li>
					</ul>
				</div>
			</nav>




		);
	}
}


export default Header;

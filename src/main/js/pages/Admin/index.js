import React, { Component } from "react";
import MaskedFormControl from 'react-bootstrap-maskedinput'
const ReactDOM = require('react-dom');
const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Table = require("react-bootstrap/Table")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import follow from '../../follow';
import client from '../../client';
import AuthenticationService from '../../service/AuthenticationService';

import Header from '../../header';

import { Link } from "react-router-dom";

const root = '/api';

class AppAdmin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {escritorios: [], attributes: [], pageSize: 50, links: {}};
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

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
	onDelete(escritorio) {
		client({method: 'DELETE', path: escritorio._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	componentDidMount() {

		this.loadFromServer(this.state.pageSize);
	}

	render() {
		return (
			<div>

				<Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link>


                <Breadcrumb>
                    <Breadcrumb.Item href="/">Início</Breadcrumb.Item>
                    <Breadcrumb.Item active href="Admin">Admin</Breadcrumb.Item>
                </Breadcrumb>

                <EscritorioList escritorios={this.state.escritorios}
                    links={this.state.links}
                    pageSize={this.state.pageSize}
                    onNavigate={this.onNavigate}
                    onDelete={this.onDelete}
                    updatePageSize={this.updatePageSize}/>
			</div>
		)
	}
}


class EscritorioList extends React.Component {

	constructor(props) {
		super(props);
    }

	render() {
		const escritorios = this.props.escritorios.map(escritorio =>
			<Escritorio key={escritorio._links.self.href} escritorio={escritorio} onDelete={this.props.onDelete}/>
		);

		return (
			<div>
				<Table>
					<tbody>
						<tr>
                            <th>#</th>
							<th>CNPJ</th>
							<th>Nome do Representante</th>
							<th>Telefone</th>
							<th>Advogado Master</th>
							<th></th>
						</tr>
						{escritorios}
					</tbody>
				</Table>
			</div>
		)
	}
}


class Escritorio extends React.Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.escritorio);
	}

	render() {
		return (
			<tr>

                <td>{this.props.escritorio.id}</td>
				<td>{this.props.escritorio.cnpj}</td>
                <td>{this.props.escritorio.nomeRepresentante}</td>
                <td>{this.props.escritorio.telefone}</td>
                <td>{this.props.escritorio.advogadoMaster}</td>
				<td>
					<Button onClick={this.handleDelete}>Delete</Button>
				</td>
			</tr>
		)
	}
}


class Admin extends Component {


  render() {
    return (
                <Header>
                    <AppAdmin/>
                </Header>
    );
  }
}

export default Admin;
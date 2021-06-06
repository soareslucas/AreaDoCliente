import React, { Component, ReactComponent } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from '../service/AuthenticationService';

const Button = require("react-bootstrap/Button")
const Form = require("react-bootstrap/Form")
const Container = require("react-bootstrap/Container")
const Row = require("react-bootstrap/Row")
const Col = require("react-bootstrap/Col")
const Nav = require("react-bootstrap/Nav")
const Badge = require("react-bootstrap/Badge")


class SideBar extends Component {
	constructor(props) {
		super(props);
		this.children = { validated: false };    
	}


    componentDidMount() {

        if(AuthenticationService.isUserLoggedIn()){

            document.body.classList.remove('sidebar-collapse'); 

        } else{
            document.body.classList.remove('sidebar-collapse'); 
            document.body.classList.add('sidebar-collapse'); 


        }
        


		
    }

  render() {
    return (

        <>


            <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="../../index3.html" className="brand-link">
                <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                <span className="brand-text font-weight-light">Área do Cliente</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                    <a href="#" className="d-block">Alexander Pierce</a>
                </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                    <li className="nav-item">
                      <Link className="nav-link" to="/signup" >
                            <i className="nav-icon fas fa-user" />
                            <p>
                                Usuários
                            </p>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" >
                            <i className="nav-icon fas fa-comments-dollar" />
                            <p>
                                Planos
                            </p>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" >
                            <i className="nav-icon fas fa-funnel-dollar" />
                            <p>
                                Seguimentos
                            </p>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" >
                                <i className="nav-icon fas fa-users" />
                                <p>
                                    Clientes
                                </p>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/signup" >
                            <i className="nav-icon fas fa-money-bill" />
                            <p>
                                Pagamentos
                            </p>
                        </Link>
                    </li>
                </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
            </aside>


      

        </>



    );
  }
}


export default SideBar;






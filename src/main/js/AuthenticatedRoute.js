import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from './service/AuthenticationService';

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
        	console.log(true);
            return <Route {...this.props} />
        } else {
        	console.log(false);
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute
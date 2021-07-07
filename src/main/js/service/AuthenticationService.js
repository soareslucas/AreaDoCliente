import axios from 'axios'


export const USER_NAME_SESSION_ATTRIBUTE_NAME = null
	
	
let ret = 0;

class AuthenticationService {


    executeBasicAuthenticationService(username, password) {
		console.log(username);

		var response = axios.post('/login?username='+username+'&password='+password)
		.then(response => {
				console.log(response);
				return response
		})

        return response;
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        console.log('register')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        var response = 'ok'
        return response;
    }
    
    

    logout() {
		sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
		return axios.post('/logout')

    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }
    
    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }


}

export default new AuthenticationService()
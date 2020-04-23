import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import Admin from './Admin/Admin';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthContext } from './Context/Auth'
import PrivateRoute from './PrivateRoute'
import Login from './Login/Login'


function Routing(props) {

    const [authTokens, setAuthTokens] = useState();
    
    if (localStorage.getItem("tokens") && authTokens === undefined) {
        setAuthTokens(localStorage.getItem("tokens"))
    }

    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router>
                <Route exact path="/" component={App} />
                <PrivateRoute exact path="/admin" component={Admin} />
                <Route path="/login" component={Login} />
            </Router>
        </AuthContext.Provider>
    )
}


ReactDOM.render(<Routing/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import Admin from './Admin/Admin';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const routing = (
    <Router>
        <Route exact path="/">
            <App />
        </Route>
        <Route exact path="/admin">
            <Admin />
        </Route>
    </Router>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

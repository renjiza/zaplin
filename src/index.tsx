import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider, inject, observer } from 'mobx-react'
import Cookies from 'universal-cookie'
import * as serviceWorker from './serviceWorker'

import global from './stores/globalStore'
import login from './stores/loginStore'
 
import App from './App'

import './styles/zaplin.less'

const cookies = new Cookies()
const stores = { global, login }

@inject('global') @observer
class Root extends React.Component<any, any> {

    componentWillMount() {
        this.props.global.auth = {
            isLogged: (cookies.get("inf-il") || false),
            client: (cookies.get("inf-cn") || ''),
            firstname: (cookies.get("inf-fn") || ''),
            lastname: (cookies.get("inf-ln") || ''),
            email: (cookies.get("inf-em") || ''),
        }
    }

    render() {
        return (
            <Router>
                <App />
            </Router>
        )
    }
}

ReactDOM.render(
    <Provider {...stores}>
        <Root />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

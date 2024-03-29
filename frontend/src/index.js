import React from 'react'
import ReactDOM from 'react-dom'
import Provider from "react-redux/es/components/Provider";
import store from './store'
import App from './app'
import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

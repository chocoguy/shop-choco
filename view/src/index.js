import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './redux/store.js'
import './bootstrap.min.css';
import './index.css';
import App from './App.jsx';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

//ReactDOM.render(<h3>React App it just werks no live reload reload :(</h3>, document.getElementById("root"));
//<React.StrictMode>
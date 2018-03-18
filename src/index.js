import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import { createLogger} from 'redux-logger';
import { Provider } from 'react-redux';
import {personGroups} from './reducers';
import {fetchToken, fetchPersonGroup} from './actions';
import { createStore, applyMiddleware } from 'redux';

const loggerMiddleware = createLogger();

let store = createStore(personGroups,
    applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

store
.dispatch(fetchToken('aswin', 'getbetter'))
.then(() => {
    console.log(store.getState());
}).then(()=>store
.dispatch(fetchPersonGroup(1, "", store.getState().login.auth_token)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();


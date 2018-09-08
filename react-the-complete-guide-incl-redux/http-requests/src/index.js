import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// set up defaults for all requests
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json'; // application/json is actually the default so you don't need to set it just demonstrating

// outgoing request interceptor
axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error)
    return Promise.reject('Request error: ' + error);
});

// incoming response interceptor
axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error)
    return Promise.reject('Response error: ' + error);
});

// You can also eject interceptor by storing them in variables eg
// var myInterceptor = axios.interceptors.request.use(request => {/*...*/});
// axios.interceptors.request.eject(myInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

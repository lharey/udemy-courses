import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';


// outgoing request interceptor
instance.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error)
    return Promise.reject('Instance Request error: ' + error);
});

// incoming response interceptor
instance.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error)
    return Promise.reject('Instance Response error: ' + error);
});

export default instance;
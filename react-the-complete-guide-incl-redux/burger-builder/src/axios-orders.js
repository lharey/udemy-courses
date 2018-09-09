import axios from 'axios';

const ordersApi = axios.create({
    baseURL: 'https://react-my-burger-39d50.firebaseio.com'
});

export default ordersApi;

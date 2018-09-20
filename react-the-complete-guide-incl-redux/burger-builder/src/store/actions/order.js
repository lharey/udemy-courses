import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: data
    };
};

export const purchaseFail = error => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    };
};

export const purchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_START
    };
};

export const purchase = orderData => {
    return (dispatch, getState) => {
        dispatch(purchaseStart());
        // the firebase end point is any node name of your choice .json
        axios.post(`/orders.json?auth=${getState().auth.token}`, orderData)
            .then(response => {
                dispatch(purchaseSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart());
        const state = getState().auth;
        axios.get(`orders.json?auth=${state.token}&orderBy="userId"&equalTo="${state.userId}"`)
            .then(res => {
                const orders = [];
                for (let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    };
};

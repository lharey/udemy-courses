import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderdata: data
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
    return dispatch => {
        dispatch(purchaseStart());
        // the firebase end point is any node name of your choice .json
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseSuccess(response.data.id, orderData));
            })
            .catch(error => {
                dispatch(purchaseFail(error));
            });
    };
};

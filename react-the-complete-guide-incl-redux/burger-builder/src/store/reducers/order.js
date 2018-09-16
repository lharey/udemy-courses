import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case actionTypes.PURCHASE_SUCCESS: {
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            newState = {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            };
            break;
        }
        case actionTypes.PURCHASE_FAIL: {
            newState = {
                ...state,
                loading: false
            };
            break;
        }
        case actionTypes.PURCHASE_START: {
            newState = {
                ...state,
                loading: true
            };
            break;
        }
        default:
            newState = state;
    }
    return newState;
};

export default reducer;

import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB0zi4Bcu76QA6roluy7zyKw1qKHFT7SWw', {
            email: email,
            password: password,
            returnSecureToken: true
        }).then(response => {
            dispatch(authSuccess(response.data));
        }).catch(error => {
            dispatch(authFail(error));
        });
    };
};

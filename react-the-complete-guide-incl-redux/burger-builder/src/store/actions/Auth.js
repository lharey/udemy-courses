import * as actionTypes from './actionTypes';
import axios from 'axios';

import * as config from '../../config';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    const url = isSignUp ?
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser' :
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';

    return dispatch => {
        dispatch(authStart());
        axios.post(`${url}?key=${config.FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        }).then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch(error => {
            dispatch(authFail(error.response.data.error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    };
};

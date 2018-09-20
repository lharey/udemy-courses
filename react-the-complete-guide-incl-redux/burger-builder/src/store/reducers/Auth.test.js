import reducer from './Auth';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store the token on login', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'testtoken',
            userId: 'testuserid'
        })).toEqual({
            token: 'testtoken',
            userId: 'testuserid',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});

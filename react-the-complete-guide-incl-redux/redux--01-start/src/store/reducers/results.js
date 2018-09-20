import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    // const newArray = [...state.results];
    // newArray.results.splice(action.resultId, 1)
    // Better to use filter for copying arrays
    const newArray = state.results.filter(ele => {
        return ele.id !== action.resultId
    });
    return updateObject(state, { results: newArray });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            // concat is like push but returns a new array instead
            // of updating the original array
            return updateObject(state, {
                results: state.results.concat({ id: new Date(), value: action.result })
            });
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
        default:
            return state
    }
};

export default reducer;
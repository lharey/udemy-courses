import * as actionTypes from '../actions';

const initialState = {
    results: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            // concat is like push but returns a new array instead
            // of updating the original array
            return {
                ...state,
                results: state.results.concat({ id: new Date(), value: action.result })
            }
        case actionTypes.DELETE_RESULT:
            // const newArray = [...state.results];
            // newArray.results.splice(action.resultId, 1)
            // Better to use filter for copying arrays
            const newArray = state.results.filter(ele => {
                return ele.id !== action.resultId
            });
            return {
                ...state,
                results: newArray

            }
        default:
            return state
    }
};

export default reducer;
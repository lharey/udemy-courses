import * as actionTypes from './actionTypes';

export const saveResult = (result) => {
    return {
        type: actionTypes.STORE_RESULT,
        result
    };
}

export const storeResult = (result) => {
    // Just using setTimeout to simulate async for an example
    return (dispatch, getState) => {
        setTimeout(() => {
            // const oldCounter = getState(getState().ctr.counter);
            // console.log(oldCounter);
            dispatch(saveResult(result))
        }, 2000);
    };
};

export const deleteResult = (resultId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultId
    };
};
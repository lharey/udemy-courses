import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingredient => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredient
    };
};

export const removeIngredient = ingredient => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredient
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};

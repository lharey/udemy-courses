import * as actionTypes from './actions';

const initialState = {
    people: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            return {
                ...state,
                people: state.people.concat({
                    id: Math.random(), // not really unique but good enough here!
                    name: action.name,
                    age: action.age
                })
            };
        case actionTypes.DELETE_PERSON:
            const newPeople = state.people.filter(person => person.id !== action.personId);
            return {
                ...state,
                people: newPeople
            };
        default:
            return state;
    }
};

export default reducer;
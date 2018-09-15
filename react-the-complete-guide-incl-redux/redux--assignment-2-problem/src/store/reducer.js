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
                    name: 'Max',
                    age: Math.floor( Math.random() * 40 )
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
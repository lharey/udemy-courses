/**
 * This is a node script
 */

const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
};

// Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        // This makes a copy of state and then overwrites the counter
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    else if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }

    return state;
};

// Store (is created with a reducer)
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
// An action must have a type. All other attributes can be
// whatever you like and is the 'payload'
const actionInc = { type: 'INC_COUNTER' };
store.dispatch(actionInc);
const actionAdd = { type: 'ADD_COUNTER', value: 10 };
store.dispatch(actionAdd);
console.log(store.getState());

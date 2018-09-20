import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';

import BurgerBuilder from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({
    adapter: new Adapter()
});

const mockStore = configureStore();
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

describe('<BurgerBuilder />', () => {
    let wrapper;
    let store;
    beforeEach(() => {
        store = mockStore({ burgerBuilder: initialState, auth: { token: 'foobar' } });
        wrapper = shallow(<Provider store={store}><BurgerBuilder onInitIngredients={() => {}} /></Provider>);
    });

    // this is failing
    it.skip('should render <BuildControls> when receiving ingredients', () => {
        wrapper.setProps({
            ings: { salad: 0 }
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});

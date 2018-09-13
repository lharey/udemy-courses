import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'query-string';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    componentWillMount () {
        const params = qs.parse(this.props.location.search);
        const price = parseFloat(params.price);
        Reflect.deleteProperty(params, 'price');
        this.setState({ ingredients: params, price });
    }

    state = {
        ingredients: null,
        price: 0
    };

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinue={this.checkoutContinue}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    // Use render here instead of component so that you can pass data
                    render={() => {
                        return (
                            <ContactData
                                ingredients={this.state.ingredients}
                                price={this.state.price}
                                {...this.props}
                            />
                        );
                    }}
                />
            </div>
        );
    }
}

Checkout.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
};

export default Checkout;

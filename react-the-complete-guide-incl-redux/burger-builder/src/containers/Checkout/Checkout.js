import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    componentDidMount () {
        this.setState({ ingredients: qs.parse(this.props.location.search) });
    }

    state = {
        ingredients: {
            cheese: 0,
            meat: 0,
            bacon: 0,
            salad: 0
        }
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
            </div>
        );
    }
}

Checkout.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object
};

export default Checkout;

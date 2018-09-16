import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        if (this.props.ings) {
            return (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinue={this.checkoutContinue}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        else {
            return <Redirect to="/" />;
        }
    }
}

Checkout.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    ings: PropTypes.object,
    totalPrice: PropTypes.number
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    };
};

export default connect(mapStateToProps)(Checkout);

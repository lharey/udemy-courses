import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope its tasty!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
                <Button
                    btnType="Danger"
                    clicked={props.checkoutCancelled}
                >CANCEL</Button>
                <Button
                    btnType="Success"
                    clicked={props.checkoutContinue}
                >CONTNUE</Button>
            </div>
        </div>
    );
};

CheckoutSummary.propTypes = {
    ingredients: PropTypes.object,
    checkoutCancelled: PropTypes.func,
    checkoutContinue: PropTypes.func
};

export default CheckoutSummary;

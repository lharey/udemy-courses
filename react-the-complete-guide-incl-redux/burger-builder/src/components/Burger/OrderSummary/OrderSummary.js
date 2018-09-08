import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            );
        });


    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>NO</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>YES</Button>
        </Aux>
    );
};

OrderSummary.propTypes = {
    ingredients: PropTypes.object,
    purchaseCancelled: PropTypes.func,
    purchaseContinue: PropTypes.func,
    price: PropTypes.number
};

export default OrderSummary;

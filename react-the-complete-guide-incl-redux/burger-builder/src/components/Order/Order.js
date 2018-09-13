import React from 'react';
import PropTypes from 'prop-types';

import classes from './Order.css';

const Order = props => {
    const ingredients = [];
    for (let name in props.ingredients) {
        ingredients.push(<span key={name}>{name} ({props.ingredients[name]})</span>);
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>{parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

Order.propTypes = {
    ingredients: PropTypes.object,
    price: PropTypes.number
};

export default Order;

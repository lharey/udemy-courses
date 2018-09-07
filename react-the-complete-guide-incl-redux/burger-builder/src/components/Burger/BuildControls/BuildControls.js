import React from 'react';

import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctr => (
                <BuildControl
                    key={ctr.label}
                    label={ctr.label}
                    added={() => props.ingredientAdded(ctr.type)}
                    removed={() => props.ingredientRemoved(ctr.type)}
                    disabled={props.disabled[ctr.type]}
                />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.order}
            >ORDER NOW</button>
        </div>
    );
};

buildControls.propTypes = {
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    disabled: PropTypes.object,
    price: PropTypes.number,
    purchaseable: PropTypes.bool,
    order: PropTypes.func
};

export default buildControls;

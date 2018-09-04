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
            {controls.map(ctr => (
                <BuildControl
                    key={ctr.label}
                    label={ctr.label}
                    added={() => props.ingredientAdded(ctr.type)}
                    removed={() => props.ingredientRemoved(ctr.type)}
                    disabled={props.disabled[ctr.type]}
                />
            ))}
        </div>
    );
};

buildControls.propTypes = {
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    disabled: PropTypes.object
};

export default buildControls;

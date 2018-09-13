import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const button = (props) => {
    return (
        <button
            className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

button.propTypes = {
    clicked: PropTypes.func,
    btnType: PropTypes.string,
    disabled: PropTypes.bool
};

export default button;

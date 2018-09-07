import React from 'react';
import PropTypes from 'prop-types';

import classes from './Toggle.css';

const toggle = (props) => {
    return (
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            <div />
            <div />
            <div />
        </div>
    );
};

toggle.propTypes = {
    clicked: PropTypes.func
};

export default toggle;

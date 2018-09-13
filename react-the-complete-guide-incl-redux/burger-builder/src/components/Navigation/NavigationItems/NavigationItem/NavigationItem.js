import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                to={props.link}
                activeClassName={classes.active}
                exact
            >
                {props.children}
            </NavLink>
        </li>
    );
};

navigationItem.propTypes = {
    link: PropTypes.string,
};

export default navigationItem;

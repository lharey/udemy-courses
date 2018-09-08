import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDraw.css';

const sideDraw = (props) => {
    let attachedClasses = [classes.SideDraw, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDraw, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

sideDraw.propTypes = {
    closed: PropTypes.func,
    open: PropTypes.bool
};

export default sideDraw;

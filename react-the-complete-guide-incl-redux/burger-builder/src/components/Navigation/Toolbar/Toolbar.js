import React from 'react';
import PropTypes from 'prop-types';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toggle from '../SideDraw/Toggle/Toggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Toggle clicked={props.toggleSideDrawHandler} />
            <div className={classes.Logo} >
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    );
};

toolbar.propTypes = {
    toggleSideDrawHandler: PropTypes.func,
    isAuth: PropTypes.bool
};

export default toolbar;

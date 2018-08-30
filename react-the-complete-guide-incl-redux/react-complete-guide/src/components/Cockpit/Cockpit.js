import React from 'react';
import PropTypes from 'prop-types';

import classes from './Cockpit.css';
import Aux from '../../hoc/Aux';

const cockpit = (props) => {

    const assignedClasses = [];
    let btnClass = classes.Button;

    if (props.showPersons) {
        btnClass = [classes.Button, classes.Red].join(' ');
    }

    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        // Note in react 16.2 you can use a build in Aux component so you can wrap in <></>
        <Aux>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button
                onClick={props.btnClicked}
                // style={style}
                className={btnClass}
            >Toggle People</button>
        </Aux>
    );
};

cockpit.propTypes = {
    btnClicked: PropTypes.func,
    appTitle: PropTypes.string,
    persons: PropTypes.array,
    showPersons: PropTypes.bool
};

export default cockpit;

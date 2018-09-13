import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.css';

const Input = props => {
    const inputClasses = [classes.InputElement];
    if (!props.valid) {
        inputClasses.push(classes.Invalid);
    }
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;
        case ('textarea'):
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input onChange={props.changed} {...props.elementConfig} value={props.value}/>;
    }

    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    elementType: PropTypes.string,
    elementConfig: PropTypes.object,
    value: PropTypes.string,
    changed: PropTypes.func,
    valid: PropTypes.bool
};

export default Input;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';

import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        }
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minlength) {
            isValid = value.length >= rules.minlength && isValid;
        }

        if (rules.maxlength) {
            isValid = value.length <= rules.maxlength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    changeHandler = (event, inputIdentifier) => {
        const data = { ...this.state.controls };
        const updatedElement = { ...data[inputIdentifier] };

        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        data[inputIdentifier] = updatedElement;

        this.setState({
            controls: data
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            const input = this.state.controls[key];

            formElementsArray.push((
                <Input
                    key={key}
                    elementType={input.elementType}
                    elementConfig={{ ...input.elementConfig, name: key }}
                    value={input.value}
                    changed={(e) => this.changeHandler(e, key)}
                    valid={!input.touched || !input.validation || input.valid}
                />
            ));
        }

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {formElementsArray}
                    <Button btnType="Success">Login</Button>
                </form>
            </div>
        );
    }
}

Auth.propTypes = {
    onAuth: PropTypes.func
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(null, mapDispatchToProps)(Auth);

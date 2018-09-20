import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../lib/utility';

class Auth extends Component {
    componentDidMount () {
        if (!this.props.buildingBurger && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirectPath('/');
        }
    }

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
        },
        isSignUp: true
    };

    changeHandler = (event, inputIdentifier) => {
        const data = updateObject(this.state.controls, {
            [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation)
            })
        });

        this.setState({
            controls: data
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp
        );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    };

    render () {
        if (this.props.isAuthenticated) {
            return (
                <div className={classes.Auth}>
                    <Redirect to={this.props.authRedirect} />
                </div>
            );
        }

        if (this.props.loading) {
            return (
                <div className={classes.Auth}>
                    <Spinner />
                </div>
            );
        }

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

        const errorMessage = this.props.error ? <p style={{ color: 'red' }}>{this.props.error.message}</p> : null;

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {formElementsArray}
                    {errorMessage}
                    <Button btnType="Success">{this.state.isSignUp ? 'SIGUP' : 'SIGNIN'}</Button>
                </form>
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}
                >
                    SWITCH TO {this.state.isSignUp ? 'SIGIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

Auth.propTypes = {
    onAuth: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    authRedirect: PropTypes.string,
    buildingBurger: PropTypes.bool,
    onSetAuthRedirectPath: PropTypes.func
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirect: state.auth.authRedirectPath,
        buildingBurger: state.burgerBuilder.building
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

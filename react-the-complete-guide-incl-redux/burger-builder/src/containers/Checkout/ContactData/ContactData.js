import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/order';
import { updateObject, checkValidity } from '../../../lib/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Postcode'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 5,
                    maxlength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', text: 'Fastest' },
                        { value: 'cheapest', text: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let identifier in this.state.orderForm) {
            formData[identifier] = this.state.orderForm[identifier].value;
        }

        const orderData = {
            ingredients: this.props.ings,
            price: this.props.totalPrice, // recommend that for a real application you would re-calculate price in case of hackin
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderStart(orderData);
    }

    changeHandler = (event, inputIdentifier) => {
        const updatedElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation)
        });

        const data = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedElement
        });

        let formIsValid = true;
        for (let identifier in data) {
            formIsValid = data[identifier].valid && formIsValid;
        }

        this.setState({
            orderForm: data,
            formIsValid
        });
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            const input = this.state.orderForm[key];

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

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray}
                <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}
                >ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

ContactData.propTypes = {
    ings: PropTypes.object,
    totalPrice: PropTypes.number,
    history: PropTypes.object,
    onOrderStart: PropTypes.func,
    loading: PropTypes.bool,
    userId: PropTypes.string
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderStart: (orderData) => dispatch(actionCreators.purchase(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

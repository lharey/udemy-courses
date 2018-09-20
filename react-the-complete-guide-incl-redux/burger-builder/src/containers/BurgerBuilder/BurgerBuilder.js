import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionCreators from '../../store/actions/index';

// For components to be tested always export the class as well as having
// a default below
export class BurgerBuilder extends Component {
    // constructor (props) {
    //     super (props);
    //     this.state = {...}
    // }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    state = {
        purchasing: false
    };

    updatePurchaseState () {
        // Map an object into array of values
        // then reduce to get total of all values
        const sum = Object.keys(this.props.ings)
            .map(igKey => {
                return this.props.ings[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger
                        ingredients={this.props.ings}
                    />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredients}
                        ingredientRemoved={this.props.onRemoveIngredients}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchaseable={this.updatePurchaseState()}
                        order={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    price={this.props.totalPrice}
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                />
            );
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

BurgerBuilder.propTypes = {
    history: PropTypes.object,
    ings: PropTypes.object,
    onAddIngredients: PropTypes.func,
    onRemoveIngredients: PropTypes.func,
    onInitIngredients: PropTypes.func,
    totalPrice: PropTypes.number,
    error: PropTypes.bool,
    onInitPurchase: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    onSetAuthRedirectPath: PropTypes.func
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
        onRemoveIngredients: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

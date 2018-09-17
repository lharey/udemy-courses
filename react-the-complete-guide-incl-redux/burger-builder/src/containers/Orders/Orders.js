import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders();
    }

    render () {
        if (this.props.loading) {
            return <Spinner />;
        }
        else {
            return (
                <div>
                    {
                        this.props.orders.map(order => {
                            return (
                                <Order
                                    key={order.id}
                                    ingredients={order.ingredients}
                                    price={order.price}
                                />
                            );
                        })
                    }
                </div>
            );
        }
    }
}

Orders.propTypes = {
    onFetchOrders: PropTypes.func,
    orders: PropTypes.array,
    loading: PropTypes.bool
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

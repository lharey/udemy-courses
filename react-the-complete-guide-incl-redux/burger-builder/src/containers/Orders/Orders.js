import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
// import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    componentDidMount () {
        axios.get('orders.json')
            .then(res => {
                console.log(res.data);
                const orders = [];
                for (let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({
                    loading: false,
                    orders
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    state = {
        orders: [],
        loading: true
    };

    render () {
        return (
            <div>
                {
                    this.state.orders.map(order => {
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

export default withErrorHandler(Orders, axios);

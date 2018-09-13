import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        },
        loading: false,

    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });

        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.price, // recommend that for a real application you would re-calculate price in case of hackin
            customer: {
                name: 'Han Solo',
                address: {
                    street: 'falcon street',
                    postcode: 'f11 b11',
                    country: 'UK'
                },
                email: 'han@test.com',
            },
            deliveryMethod: 'fastest'
        };

        // the firebase end point is any node name of your choice .json
        axios.post('/orders.json', orderData)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render () {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postcode" placeholder="Postcode" />
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                >ORDER</Button>
            </form>
        );

        if (this.state.loading) {
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
    ingredients: PropTypes.object,
    price: PropTypes.number,
    history: PropTypes.object
};

export default ContactData;

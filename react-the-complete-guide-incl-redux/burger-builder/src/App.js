import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import asynComponent from './hoc/asyncComponent/asyncComponent';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

// Can laxy load some components that may not always be used
const asyncCheckout = asynComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asynComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asynComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount () {
        this.props.onTryAutoSignup();
    }

    render () {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                {/* this redirects any unknown route to the root page */}
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

App.propTypes = {
    onTryAutoSignup: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

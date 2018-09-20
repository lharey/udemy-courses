import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        componentDidMount () {
            importComponent()
                .then(cmp => {
                    this.setState({ component: cmp.default });
                });
        }

        state = {
            component: null
        };

        render () {
            const Comp = this.state.component;

            return Comp ? <Comp {...this.props} /> : null;
        }
    };
};

export default asyncComponent;

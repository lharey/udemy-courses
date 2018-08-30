import React, { Component } from 'react';
// import Radium from 'radium';
import PropTypes from 'prop-types';

import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass2';

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person.js] inside constructor', props);
    }

    componentWillMount() {
        console.log('[Person.js] inside componentWillMount');
    }

    componentDidMount() {
        console.log('[Person.js] inside componentDidMount');
    }

    render () {
        console.log('[Person.js] inside componentDidMount');
        return (
            <Aux>
                <p onClick={this.props.click}>My name is {this.props.name} and I'm {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input
                    type="text"
                    onChange={this.props.changed}
                    username={this.props.name}
                />
            </Aux>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    changed:PropTypes.func
};

// export default Radium(Person);
export default withClass(Person, classes.Person);

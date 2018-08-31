import React, { Component } from 'react';
// import Radium from 'radium';
import PropTypes from 'prop-types';

import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass2';

// React context api introduced in v16.3
import { AuthContext } from '../../../containers/App';

class Person extends Component {
    constructor (props) {
        super(props);
        console.log('[Person.js] inside constructor', props);
        this.inputElement = React.createRef(); // createRef is available from v16.3
    }

    // React 16.3 discourages the used of componentWillMount
    componentWillMount () {
        console.log('[Person.js] inside componentWillMount');
    }

    componentDidMount () {
        console.log('[Person.js] inside componentDidMount');
        // if (this.props.position === 0) {
        //     // this.inputElement.focus();
        //     this.inputElement.current.focus();
        // }
    }

    focusMe () {
        console.log('running focus');
        this.inputElement.current.focus();
    }

    render () {
        console.log('[Person.js] inside componentDidMount');
        return (
            <Aux>
                <AuthContext.Consumer>
                    { auth => auth ? <p>I'm authenticated</p> : null }
                </AuthContext.Consumer>
                <p onClick={this.props.click}>My name is {this.props.name} and I'm {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input
                    // ref={(ele) => { this.inputElement = ele; }} // pre v16.3
                    ref={this.inputElement} //use references with care
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
    changed: PropTypes.func,
    position: PropTypes.number
};

// export default Radium(Person);
export default withClass(Person, classes.Person);

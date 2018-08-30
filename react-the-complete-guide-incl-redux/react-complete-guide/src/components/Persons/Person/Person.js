import React, { Component } from 'react';
// import Radium from 'radium';

import classes from './Person.css';

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
            <div className={classes.Person}>
                <p onClick={this.props.click}>My name is {this.props.name} and I'm {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input
                    type="text"
                    onChange={this.props.changed}
                    username={this.props.name}
                />
            </div>
        );
    }
}

// export default Radium(Person);
export default Person;

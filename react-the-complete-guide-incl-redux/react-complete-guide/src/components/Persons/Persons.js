import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Person from './Person/Person';

class Persons extends PureComponent {
    constructor (props) {
        super(props);
        console.log('[Persons.js] inside constructor', props);
        this.lastPersonRef = React.createRef();
    }

    // React 16.3 discourages the used of componentWillMount
    componentWillMount () {
        console.log('[Persons.js] inside componentWillMount');
    }

    componentDidMount () {
        console.log('[Persons.js] inside componentDidMount');
        this.lastPersonRef.current.focusMe();
    }

    // React 16.3 discourages the used of componentWillReceiveProps
    componentWillReceiveProps (nextProps) {
        console.log('[Persons.js] inside componentWillReceiveProps', nextProps);
    }

    // A PureComponent has this built in - only use it if updates might not be required
    // shouldComponentUpdate (nextProps, nextState) {
    //     console.log('[Persons.js] inside shouldComponentUpdate', nextProps, nextState);
    //     return nextProps.persons !== this.props.persons ||
    //     nextProps.changed !== this.props.changed ||
    //     nextProps.clicked !== this.props.clicked;
    // }

    // React 16.3 discourages the used of componentWillUpdate
    componentWillUpdate (nextProps, nextState) {
        console.log('[Persons.js] inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate () {
        console.log('[Persons.js] inside componentDidUpdate');
    }

    render () {
        console.log('[Persons.js] inside render');
        return this.props.persons.map((person, index) => {
            return (
                <Person
                    click={() => this.props.clicked(index)}
                    name={person.name}
                    age={person.age}
                    position={index}
                    forwardedRef={this.lastPersonRef}
                    key={`person${index}`}
                    changed={(event) => this.props.changed(event, person.id)}
                />
            );
        });
    }
}

Person.propTypes = {
    persons: PropTypes.array
};

export default Persons;

import React, { Component } from 'react';

// Radium is a set of tools to manage inline styles on React elements
// https://formidable.com/open-source/radium/
// import Radium, { StyleRoot } from 'radium';

// When using css modules - specified in webpack config
// https://github.com/css-modules/css-modules
import classes from './App.css';
// without using css modules
// import './App.css';

//import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';


class App extends Component {
    constructor(props) {
        super(props);
        console.log('[App.js] inside constructor', props);
        this.state = {
            people: [
                { id: 1, name: 'Alex', age: 4 },
                { id: 2, name: 'Erin', age: 6 },
                { id: 3, name: 'Archie', age: 0 },
            ],
            showPeople: false
        };
    }

    componentWillMount() {
        console.log('[App.js] inside componentWillMount');
    }

    componentDidMount() {
        console.log('[App.js] inside componentDidMount');
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log('[App.js] inside shouldComponentUpdate', nextProps, nextState);
        return true;
    }

    componentWillUpdate (nextProps, nextState) {
        console.log('[App.js] inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate () {
        console.log('[App.js] inside componentDidUpdate');
    }

    // Initialising state outside of constructor only works in more modern versions
    // state = {
    //     people: [
    //         { id: 1, name: 'Alex', age: 4 },
    //         { id: 2, name: 'Erin', age: 6 },
    //         { id: 3, name: 'Archie', age: 0 },
    //     ],
    //     showPeople: false
    // }

    deletePersonHandler = (index) => {
        // const people = this.state.people.slice(); // slice without args copies array
        const people = [...this.state.people]; // using spread operator is a nicer way of copying array
        people.splice(index, 1);
        this.setState({
            people
        });
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.people.findIndex(p => {
            return p.id === id;
        });

        const people = [...this.state.people];

        const person = {
            ...this.state.people[personIndex]
        };

        // or
        // const person = Object.assign({}, this.state.people[personIndex]);

        person.name = event.target.value;

        people[personIndex] = person;

        this.setState({
            people
        });
    }

    togglePeopleHandler = () => {
        const doesShow = this.state.showPeople;
        this.setState({ showPeople: !doesShow });
    }

    render () {
        console.log('[App.js] inside render');
        let people = null;
        if (this.state.showPeople) {
            people = <Persons
                persons={this.state.people}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}
            />;

        }

        // StlyeRoot enable media queries to be used with inline styles in all components
        return (
            // <StyleRoot>
            // without css modules <div className="App">
            // with css modules
            <div className={classes.App}>
                <Cockpit
                    appTitle={this.props.title}
                    showPersons={this.state.showPeople}
                    persons={this.state.people}
                    btnClicked={this.togglePeopleHandler}
                />
                {people}
            </div>
            // </StyleRoot>
        );

        //return React.createElement('div',{ className: "App" },React.createElement('h1',null,"Hi I'm a react App!!!!"));
    }
}

// export default Radium(App);
export default App;

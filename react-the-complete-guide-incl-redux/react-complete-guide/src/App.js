import React, { Component } from 'react';

// Radium is a set of tools to manage inline styles on React elements
// https://formidable.com/open-source/radium/
// import Radium, { StyleRoot } from 'radium';

// When using css modules - specified in webpack config
// https://github.com/css-modules/css-modules
import classes from './App.css';
// without using css modules
// import './App.css';

import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Person from './Person/Person';


class App extends Component {
    state = {
        people: [
            { id: 1, name: 'Alex', age: 4 },
            { id: 2, name: 'Erin', age: 6 },
            { id: 3, name: 'Archie', age: 0 },
        ],
        showPeople: false
    }

    deletePersonHandler = (index) => {
        console.log('deletePersonHandler');
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
        // const style = {
        //     backgroundColor: 'green',
        //     color: 'white',
        //     font: 'inherit',
        //     border: '1px solid blue',
        //     padding: '8px',
        //     cursor: 'pointer',
        //     // inline hover only works with Radium
        //     // ':hover': {
        //     //     backgroundColor: 'lightgreen',
        //     //     color: 'black'
        //     // }
        // };

        let people = null;
        let btnClass = '';

        if (this.state.showPeople) {
            people = (
                <div>
                    {this.state.people.map((person, index) => {
                        return (
                            // Only wrap things with ErrorBoundary if you know where code might fail beyond your control
                            // Eg api requests
                            <ErrorBoundary key={`person${index}`}>
                                <Person
                                    click={() => this.deletePersonHandler(index)}
                                    name={person.name}
                                    age={person.age}
                                    changed={(event) => this.nameChangedHandler(event, person.id)}
                                />
                            </ErrorBoundary>
                        );
                    })}
                </div>
            );

            //style.backgroundColor = 'red';
            // inline hover only works with Radium
            // style[':hover'] = {
            //     backgroundColor: 'orange',
            //     color: 'black'
            // };

            btnClass = classes.Red;
        }

        const assignedClasses = [];
        if (this.state.people.length <= 2) {
            assignedClasses.push(classes.red);
        }
        if (this.state.people.length <= 1) {
            assignedClasses.push(classes.bold);
        }

        // StlyeRoot enable media queries to be used with inline styles in all components
        return (
            // <StyleRoot>
            // with css modules
            <div className={classes.App}>
                {/* without css modules <div className="App"> */}
                <h1>Hi I'm a react App</h1>
                <p className={assignedClasses.join(' ')}>This is really working!</p>
                <button
                    onClick={this.togglePeopleHandler}
                    // style={style}
                    className={btnClass}
                >Toggle People</button>

                {people}
            </div>
            // </StyleRoot>
        );

        //return React.createElement('div',{ className: "App" },React.createElement('h1',null,"Hi I'm a react App!!!!"));
    }
}

// export default Radium(App);
export default App;

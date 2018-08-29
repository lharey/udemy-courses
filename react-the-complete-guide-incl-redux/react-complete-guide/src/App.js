import React, { Component } from 'react';
import './App.css';
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
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        let people = null;

        if (this.state.showPeople) {
            people = (
                <div>
                    {this.state.people.map((person, index) => {
                        return (
                            <Person
                                click={() => this.deletePersonHandler(index)}
                                name={person.name}
                                age={person.age}
                                key={`person${index}`}
                                changed={(event) => this.nameChangedHandler(event, person.id)}
                            />
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="App">
                <h1>Hi I'm a react App</h1>
                <button
                    onClick={this.togglePeopleHandler}
                    style={style}
                >Toggle People</button>

                {people}
            </div>

        );

        //return React.createElement('div',{ className: "App" },React.createElement('h1',null,"Hi I'm a react App!!!!"));
    }
}

export default App;

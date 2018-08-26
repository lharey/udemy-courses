import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { name: 'Alex', age: 4 },
            { name: 'Erin', age: 6 },
            { name: 'Archie', age: 0 },
        ]
    }

    switchNameHandler = (newName) => {
        this.setState({
            persons: [
                { name: newName, age: 4 },
                { name: 'Erin', age: 6 },
                { name: 'Archie', age: 0 },
            ]
        });
    }

    nameChangedHandler = (event) => {
        this.setState({
            persons: [
                { name: 'Alex', age: 4 },
                { name: event.target.value, age: 6 },
                { name: 'Archie', age: 0 },
            ]
        });
    }

    render() {
        const style = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        return (
            <div className="App">
                <h1>Hi I'm a react App</h1>
                <button
                    onClick={() => this.switchNameHandler('Alexander')}
                    style={style}
                >Switch Name</button>
                <Person
                    name={this.state.persons[0].name}
                    age={this.state.persons[0].age}
                    clickNameHandler={this.switchNameHandler.bind(this, 'Alexander!')}
                />
                <Person
                    name={this.state.persons[1].name}
                    age={this.state.persons[1].age}
                    changed={this.nameChangedHandler}
                >
                    My hobbies are drawing
                </Person>
                <Person
                    name={this.state.persons[2].name}
                    age={this.state.persons[2].age}
                />
            </div>

        );

        //return React.createElement('div',{ className: "App" },React.createElement('h1',null,"Hi I'm a react App!!!!"));
    }
}

export default App;

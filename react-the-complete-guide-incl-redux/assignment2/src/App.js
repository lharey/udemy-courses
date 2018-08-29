import React, { Component } from 'react';
import ValidationComponent from './Components/ValidationComponent';
import CharComponent from './Components/CharComponent';

import './App.css';

class App extends Component {
    state = {
        text: '',
        chars: []
    };

    inputChangeHandler = (event) => {
        this.setState({
            text: event.target.value,
            chars: event.target.value.split('')
        });
    };

    clickCharHandler = (index) => {
        const newChars = [...this.state.chars];
        newChars.splice(index, 1);

        this.setState({
            text: newChars.join(''),
            chars: newChars
        });
    }

    render() {
        const charList = (
            <div>
                {
                    this.state.chars.map((char, index) => {
                        return (
                            <CharComponent
                                char={char}
                                key={index}
                                clicked={() => this.clickCharHandler(index)}
                            />
                        );
                    })
                }
            </div>
        );

        return (
            <div className="App">
                <input
                    onChange={this.inputChangeHandler}
                    value={this.state.text}
                />
                <p>The length is {this.state.text.length}</p>
                <ValidationComponent inputLength={this.state.text.length}/>

                {charList}

            </div>
        );
    }
}

export default App;

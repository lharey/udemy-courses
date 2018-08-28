import React, { Component } from 'react';
import UserInput from './Components/UserInput';
import UserOutput from './Components/UserOutput';

import './App.css';
import './Components/UserOutput.css';

class App extends Component {
    state = {
        usernames: ['sheridenj', 'garibaldim', 'ivonovas']
    };

    changeUserHandler = (event) => {
        this.setState({
            usernames: [event.target.value, 'garibaldim', 'ivonovas']
        });
    }

    render() {
        return (
            <div className="App">
                <UserInput
                    changed={this.changeUserHandler}
                    username={this.state.usernames[0]}
                />
                <UserOutput
                    username={this.state.usernames[0]}
                />
                <UserOutput
                    username={this.state.usernames[1]}
                />
                <UserOutput
                    username={this.state.usernames[2]}
                />
            </div>
        );
    }
}

export default App;

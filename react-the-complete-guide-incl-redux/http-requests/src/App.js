import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
        // Only need to specify basename if your app isn't served from /
        // <BrowserRouter basename="/my-app">
        <BrowserRouter />
            <div className="App">
                <Blog />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;

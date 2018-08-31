import React, { Component } from 'react';

// https://reactjs.org/docs/error-boundaries.html

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: '',
        info: null
    }

    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error, info});
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong!</h1>;
        }
        else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;

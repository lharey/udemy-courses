import React, { Component } from 'react';
import qs from 'query-string';

class Course extends Component {

    render () {
        const id = this.props.match.params.id;
        const queryParams = qs.parse(this.props.location.search);
        return (
            <div>
                <h1>{queryParams.title}</h1>
                <p>You selected the Course with ID: {id}</p>
            </div>
        );
    }
}

export default Course;
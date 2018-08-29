// import React, { Component } from 'react';
import React from 'react';

import './Person.css';

// class Person extends Component {
//     render () {
//         return (
//             <div>
//                 <p>My name is {this.props.name} and I'm {this.props.age} years old.</p>
//                 <p>{this.props.children}</p>
//             </div>
//         );
//     }
// }

const Person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>My name is {props.name} and I'm {props.age} years old.</p>
            <p>{props.children}</p>
            <input
                type="text"
                onChange={props.changed}
                username={props.name}
            />
        </div>
    );
};

export default Person;

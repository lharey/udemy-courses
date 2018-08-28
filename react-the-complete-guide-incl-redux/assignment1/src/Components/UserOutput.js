import React from 'react';

const UserOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>Welcome!</p>
            <p>Your username is {props.username}</p>
        </div>
    );
};

export default UserOutput;

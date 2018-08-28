import React from 'react';

const UserInput = (props) => {
    const style = {
        border: '3px solid #99ccff',
        width: '200px'
    };

    return (
        <div className="UserInput">
            <input
                type="text"
                onChange={props.changed}
                defaultValue={props.username}
                style={style}
            ></input>
        </div>
    );
};

export default UserInput;

import React from 'react';

const ValidationComponent = (props) => {
    return (
        <div className="ValidationComponent">
            <p>{props.inputLength < 5 ? 'Text too short' :  props.inputLength > 10 ? 'text too long' : ''}</p>
        </div>
    );
};

export default ValidationComponent;

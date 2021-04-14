import React from 'react';

function Button(props) {
    return (
        <input type = "button" style={props.style} onClick={props.onClick} value = {props.value}/>
    );
}

export default Button;
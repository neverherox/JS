import React from 'react';
function Output(props) {
    return (
        <div>
            <input type="text" value={props.value} disabled />
            {props.children}
        </div>
    );
}
export default Output;
import React from 'react';

function NoteRow(props) {
    return (
        <tr>
            <td>{props.expression}</td>
            <td>{props.result}</td>
        </tr>
    );
}

export default NoteRow;
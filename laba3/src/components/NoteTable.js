import React from 'react';
import NoteRow from './NoteRow';

class NoteTable extends React.Component {

    renderNote(expression, result, id) {
        return (
            <NoteRow
                expression={expression}
                result={result}
                key = {id}
            />
        );
    }

    render() {
        let notes = this.props.notes.map(note => {
            return this.renderNote(note.Expression, note.Result, note.Id);
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>expression</th>
                        <th>result</th>
                    </tr>
                </thead>
                <tbody>{notes}</tbody>
            </table>
        );
    }
}

export default NoteTable;
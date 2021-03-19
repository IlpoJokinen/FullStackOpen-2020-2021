import React, { useState } from 'react';

const AddNote = ({ createNote }) => {
    const [newNote, setNewNote] = useState('');

    const handleChange = event => {
        setNewNote(event.target.value);
    };


    const addNote = event => {
        event.preventDefault();
        createNote({
            content: newNote,
            // date: new Date().toISOString(),
            important: Math.random() > 0.5,
        });

        setNewNote('');
    }

    return (
        <div>
            <h2>Create a new note</h2>
            <form onSubmit={addNote}>
                <input type="text" value={newNote} onChange={handleChange}></input>
                <button type="submit">save</button>
            </form>
        </div>
    )
};

export default AddNote;
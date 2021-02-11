import React from 'react';

const AddNote = ({ setNewNote, addNote, newNote }) => {

    const handleChange = (e) => {
        setNewNote(e.target.value);
    };

    return (
        <div>
            <input type="text" value={newNote} onChange={e => handleChange(e)}></input>
            <button onClick={addNote}>save</button>
        </div>
    )
};

export default AddNote;
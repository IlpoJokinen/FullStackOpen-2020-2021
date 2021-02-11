import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import AddNote from './components/AddNote'

import noteService from './services/notes'

const App = () => {
    const [notes, setNotes] = useState()
    const [newNote, setNewNote] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                let copy = JSON.parse(JSON.stringify(initialNotes));
                setNotes(copy)
                return copy
            })
    }, [])

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already deleted from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const addNote = event => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }
    console.log(notes)
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {notes && (
                <ul>
                    {notes.map(note =>
                        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                    )}
                </ul>
            )}
            <AddNote setNewNote={setNewNote} addNote={addNote} newNote={newNote} />
            <Footer />
        </div>
    )
}

export default App
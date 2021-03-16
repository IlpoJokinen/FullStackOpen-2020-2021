import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import AddNote from './components/AddNote'
import LoginForm from './components/LoginForm'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
    const [notes, setNotes] = useState()
    const [newNote, setNewNote] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                let copy = JSON.parse(JSON.stringify(initialNotes));
                setNotes(copy)
                return copy
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            noteService.setToken(user.token);
        }
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

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {user === null
                ? <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setUser={setUser}
                    setErrorMessage={setErrorMessage}
                /> :
                <div>
                    <div>
                        <p>{user.name} logged in</p>
                        <button onClick={() => loginService.logout(setUser)}>Log out</button>
                    </div>
                    <hr />
                    <AddNote setNewNote={setNewNote} addNote={addNote} newNote={newNote} />
                </div>
            }
            {notes && (
                <ul>
                    {notes.map(note =>
                        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                    )}
                </ul>
            )}
            <Footer />
        </div>
    )
}

export default App
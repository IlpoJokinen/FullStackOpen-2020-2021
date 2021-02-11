import React from 'react'

const ContactForm = ({ newName, handleChange, numberInput, handleNumber, addPerson }) => {
    return (
        <div>
            <h2>add new contact</h2>
            name: <input value={newName} onChange={handleChange} />
            number: <input value={numberInput || ''} onChange={handleNumber} />
            <button type="submit" onClick={addPerson}>add</button>
        </div>
    )
}

export default ContactForm
import React, { useState, useEffect } from 'react'

import { updatePersonsNumber } from './utils/utils'
import personService from './services/persons'

import Filter from './components/Filter'
import Contacts from './components/Contacts'
import ContactForm from './components/ContactForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [numberInput, setNumberInput] = useState('')
  const [searchWord, setWord] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const searchWordChanged = (e) => {
    e.preventDefault()
    setWord(e.target.value)
  }

  const handleNumber = (e) => {
    e.preventDefault()
    setNumberInput(e.target.value)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const handleErrorMessage = (message, status) => {
    setErrorMsg({ message: message, status: status })
    setTimeout(() => {
      setErrorMsg(null)
    }, 5000)
  };

  const addPerson = (e) => {
    e.preventDefault()
    const numberInPhonebook = persons.some(person => person.number === numberInput)
    const nameInPhonebook = persons.some(person => person.name === newName)
    if (numberInPhonebook) {
      handleErrorMessage('Given phonenumber is already in the phonebook', 'failure')
      setNumberInput('')
      return numberInPhonebook
    }
    if (nameInPhonebook) {
      const updatedPerson = persons.find(person => person.name === newName)
      updatePersonsNumber(updatedPerson, numberInput, persons, setPersons, setErrorMsg)
      return nameInPhonebook
    }
    personService
      .create({ name: newName, number: numberInput })
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
      })
      .catch(error => {
        const errorMsg = error.response.data.error
        handleErrorMessage(errorMsg, 'failure')
      })
    handleErrorMessage(`${newName} was added to the phonebook`, 'create')
  }

  const removePerson = id => {
    const removedPerson = persons.find(person => person.id === id)
    const proceedToDelete = window.confirm(`Delete ${removedPerson.name} ?`)
    if (proceedToDelete) {
      const removedPersonId = personService.remove(id)
      const newPersonArray = persons.filter(person => person.id !== removedPersonId)
      setPersons(newPersonArray)
      setErrorMsg({ message: `Person ${removedPerson.name} was removed`, status: 'delete' })
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    } else {
      return
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMsg && (
        <Notification message={errorMsg.message} status={errorMsg.status} />
      )}
      <Filter searchWord={searchWord} callback={searchWordChanged} />
      <div style={{ height: 30 }} />
      <Contacts persons={persons} searchWord={searchWord} removePerson={removePerson} />
      <div style={{ height: 30 }} />
      <ContactForm name={newName} handleNumber={handleNumber} handleChange={handleChange}
        addPerson={addPerson} numberInput={numberInput} />
    </div>
  )

}

export default App
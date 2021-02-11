import personService from '../services/persons'

export const updatePersonsNumber = (updatedPerson, numberInput, persons, setPersons, setErrorMsg) => {
    if (numberInput.length) {
        const proceedToUpdate = window.confirm(
            `${updatedPerson.name} is already added to the phonebook, replace the old number with the new one?`
        )
        if (proceedToUpdate) {
            personService
                .update(updatedPerson, numberInput)
                .then(returnedPerson => {
                    setPersons(persons.map(person => person.name !== updatedPerson.name ? person : returnedPerson))
                })
                .catch(error => {
                    setErrorMsg({
                        message: `Information of ${updatedPerson.name} has already been removed from server`,
                        status: 'failure'
                    })
                })
            setErrorMsg({ message: `Number of ${updatedPerson.name} changed succesfully`, status: 'update' })
            setTimeout(() => {
                setErrorMsg(null)
            }, 5000)
        } else {
            return
        }
    } else {
        setErrorMsg({ message: `Please give a phonenumber`, status: 'failure' })
        setTimeout(() => {
            setErrorMsg(null)
        }, 5000)
    }
}

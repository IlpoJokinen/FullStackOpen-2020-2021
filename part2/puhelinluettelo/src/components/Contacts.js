import React from 'react'
import Contact from './Contact'

const Contacts = ({ persons, searchWord, removePerson }) => {

    let index = 0

    const FilteredPerson = persons.map(person => {
        index++
        if (person.name.toLowerCase().includes(searchWord.toLowerCase())) {
            return <Contact
                key={person.id}
                name={person.name}
                number={person.number}
                id={person.id}
                removePerson={removePerson}
            />
        }
    })

    return (
        <table>
            <tbody key={index}>
                {FilteredPerson}
            </tbody>
        </table>
    )

}

export default Contacts
import React from 'react'

const Contact = ({ name, number, id, removePerson }) => {

    return (
        <tr>
            <td>{name}</td>
            <td>{number}</td>
            <td><button onClick={() => removePerson(id)}>delete</button></td>
        </tr>
    )
}

export default Contact
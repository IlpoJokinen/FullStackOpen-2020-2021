import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    axios.delete(`${baseUrl}/${id}`)
    return id
}

const update = (person, newNumber) => {
    const changedPerson = { ...person, number: newNumber }
    const request = axios.put(`${baseUrl}/${person.id}`, changedPerson)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }
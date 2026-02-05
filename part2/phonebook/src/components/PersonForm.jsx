import axios from 'axios'

const PersonForm = ({
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    persons,
    setPersons,
}) => {
    const handleName = (event) => {
        setNewName(event.target.value)
    }

    const handleNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // check to see if this person is already in the phone book
        const duplicate = persons.some((person) => person.name === newName)
        if (duplicate) {
            alert(`${newName} is already in the phonebook`)
            return
        }
        const newPersonObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        }
        axios
            .post('http://localhost:3001/persons', newPersonObject)
            .then((response) => console.log(response))
        setPersons(persons.concat(newPersonObject))
        setNewName('')
        setNewNumber('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input onChange={handleName} value={newName} />
            </div>
            <div>
                number: <input onChange={handleNumber} value={newNumber} />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}
export default PersonForm

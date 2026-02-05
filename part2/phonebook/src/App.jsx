import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then((response) => setPersons(response.data))
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                persons={persons}
                filter={filter}
                setFilter={setFilter}
                setFilteredPersons={setFilteredPersons}
            />

            <h3>add a new name and number</h3>
            <PersonForm
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                persons={persons}
                setPersons={setPersons}
            />

            <h3>Numbers</h3>
            <Persons
                filter={filter}
                persons={persons}
                filteredPersons={filteredPersons}
            />
        </div>
    )
}

export default App

import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsActions from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [filteredPersons, setFilteredPersons] = useState([])

	useEffect(() => {
		personsActions
			.getAll()
			.then(initialData => setPersons(initialData))
			.catch(error => {
				console.error(error)
			})
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
				addPerson={personsActions.addPerson}
				updatePerson={personsActions.updatePerson}
			/>

			<h3>Numbers</h3>
			<Persons
				filter={filter}
				persons={persons}
				filteredPersons={filteredPersons}
				deletePerson={personsActions.deletePerson}
				getAll={personsActions.getAll}
				setPersons={setPersons}
			/>
		</div>
	)
}

export default App

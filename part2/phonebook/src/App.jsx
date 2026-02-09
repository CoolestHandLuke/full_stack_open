import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsActions from './services/persons'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')
	const [filteredPersons, setFilteredPersons] = useState([])
	const [notification, setNotification] = useState(null)

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
			<Notification notification={notification} />
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
				setNotification={setNotification}
			/>

			<h3>Numbers</h3>
			<Persons
				filter={filter}
				persons={persons}
				filteredPersons={filteredPersons}
				deletePerson={personsActions.deletePerson}
				getAll={personsActions.getAll}
				setPersons={setPersons}
				setNotification={setNotification}
			/>
		</div>
	)
}

export default App

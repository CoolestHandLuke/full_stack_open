const PersonForm = ({
	newName,
	setNewName,
	newNumber,
	setNewNumber,
	persons,
	setPersons,
	addPerson,
	updatePerson,
}) => {
	const handleName = event => {
		setNewName(event.target.value)
	}

	const handleNumber = event => {
		setNewNumber(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()

		const newPersonObject = {
			name: newName,
			number: newNumber,
		}
		const duplicate = persons.find(person => person.name === newName)

		if (duplicate) {
			if (
				window.confirm(
					`${newName} is already in the phonebook, do you want to update their number?`
				)
			) {
				updatePerson(duplicate.id, newPersonObject)
					.then(response => {
						setPersons(
							persons.map(person =>
								person.name === response.name
									? { ...person, number: newNumber }
									: person
							)
						)
						setNewName('')
						setNewNumber('')
					})
					.catch(error => {
						console.log('error in updating person', error)
					})
			}
		} else {
			addPerson(newPersonObject)
				.then(responsedPerson => {
					setPersons(persons.concat(responsedPerson))
					setNewName('')
					setNewNumber('')
				})
				.catch(error => {
					console.error('error in adding new person', error)
				})
		}
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

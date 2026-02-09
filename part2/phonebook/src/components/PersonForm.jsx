const PersonForm = ({
	newName,
	setNewName,
	newNumber,
	setNewNumber,
	persons,
	setPersons,
	addPerson,
	updatePerson,
	setNotification,
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
				const newNotification = {
					type: 'success',
					message: `Successfully updated the record for ${duplicate.name}.`,
				}
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
						setNotification(newNotification)
					})
					.catch(error => {
						console.error('Error in updating the phonebook:', error)
						const newNotification = {
							type: 'error',
							message: `Information on ${newPersonObject.name} has already been removed from the server`,
						}
						setNotification(newNotification)

						setTimeout(() => {
							setNotification(null)
						}, 5000)
					})
			}
		} else {
			const newNotification = {
				type: 'success',
				message: `Successfully added ${newPersonObject.name} to the phonebook.`,
			}
			addPerson(newPersonObject)
				.then(responsedPerson => {
					setPersons(persons.concat(responsedPerson))
					setNewName('')
					setNewNumber('')
					setNotification(newNotification)
				})
				.catch(error => {
					console.error('error in adding new person', error)
				})
		}

		setTimeout(() => {
			setNotification(null)
		}, 5000)
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

const Persons = ({
	filter,
	persons,
	setPersons,
	filteredPersons,
	deletePerson,
	getAll,
	setNotification,
}) => {
	const handleDelete = (id, name) => {
		if (!window.confirm('Delete ' + name + '?')) {
			return
		}

		deletePerson(id)
			.then(deletedPerson => {
				getAll().then(updatedPersons => setPersons(updatedPersons))
				const newNotification = {
					type: 'success',
					message: `Successfully deleted ${deletedPerson.name} from the phonebook.`,
				}
				setNotification(newNotification)
			})
			.catch(error => {
				console.error(error)
			})
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}
	return (
		<>
			<div>
				{filter === ''
					? persons.map(person => (
							<div key={person.id}>
								{person.name} {person.number}
								<button
									onClick={() =>
										handleDelete(person.id, person.name)
									}
								>
									delete
								</button>
							</div>
						))
					: filteredPersons.map(person => (
							<div key={person.id}>
								{person.name} {person.number}
								<button
									onClick={() =>
										handleDelete(person.id, person.name)
									}
								>
									delete
								</button>
							</div>
						))}
			</div>
		</>
	)
}
export default Persons

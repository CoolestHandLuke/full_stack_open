const Persons = ({
	filter,
	persons,
	setPersons,
	filteredPersons,
	deletePerson,
	getAll,
}) => {
	const handleDelete = (id, name) => {
		if (!window.confirm('Delete ' + name + '?')) {
			return
		}
		deletePerson(id)
			.then(deletedPerson => {
				getAll().then(updatedPersons => setPersons(updatedPersons))
			})
			.catch(error => {
				console.error(error)
			})
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

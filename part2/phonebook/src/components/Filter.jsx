const Filter = ({ persons, filter, setFilter, setFilteredPersons }) => {
    const handleFilter = (event) => {
        const newFilter = event.target.value.toLowerCase()
        setFilter(newFilter)
        setFilteredPersons(
            persons.filter((person) =>
                person.name.toLowerCase().includes(newFilter),
            ),
        )
    }
    return (
        <div>
            filter by name: <input onChange={handleFilter} value={filter} />
        </div>
    )
}
export default Filter

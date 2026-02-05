const Persons = ({ filter, persons, filteredPersons }) => {
    return (
        <div>
            {filter === ''
                ? persons.map((person) => (
                      <div key={person.id}>
                          {person.name} {person.number}
                      </div>
                  ))
                : filteredPersons.map((person) => (
                      <div key={person.id}>
                          {person.name} {person.number}
                      </div>
                  ))}
        </div>
    )
}
export default Persons

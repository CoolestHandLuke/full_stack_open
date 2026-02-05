import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    const fetchData = () => {
        console.log('effect is happening')
        const response = axios
            .get('http://localhost:3001/notes')
            .then((response) => {
                console.log('Promise has been fulfilled')
                setNotes(response.data)
            })
    }

    useEffect(fetchData, [])

    console.log('Main page is rendering, there are ', notes.length, 'notes')

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important === true)

    const addNote = (event) => {
        event.preventDefault()
        const newNoteObject = {
            id: notes.length + 1,
            content: newNote,
            important: Math.random() > 0.5,
        }
        setNotes(notes.concat(newNoteObject))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const toggleShowAll = () => {
        setShowAll(!showAll)
    }
    return (
        <div>
            <h1>Notes</h1>
            <button onClick={toggleShowAll}>Filter by importance</button>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type='submit'>save</button>
            </form>
        </div>
    )
}

export default App

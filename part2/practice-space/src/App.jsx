import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('a new note...')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		noteService
			.getAll()
			.then(initialData => setNotes(initialData))
			.catch(error => console.log('error'))
	}, [])

	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important === true)

	const addNote = event => {
		event.preventDefault()
		const newNoteObject = {
			content: newNote,
			important: Math.random() > 0.5,
		}

		noteService.createNote(newNoteObject).then(respondedNote => {
			setNotes(notes.concat(respondedNote))
		})
		setNewNote('')
	}

	const handleNoteChange = event => {
		setNewNote(event.target.value)
	}

	const toggleShowAll = () => {
		setShowAll(!showAll)
	}

	const toggleImportanceOf = id => {
		const note = notes.find(note => note.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then(updatedNote => {
				setNotes(
					notes.map(note => (note.id === id ? updatedNote : note))
				)
			})
			.catch(error => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter(n => n.id !== id))
			})
	}
	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			<button onClick={toggleShowAll}>Filter by importance</button>
			<ul>
				{notesToShow.map(note => (
					<Note
						key={note.id}
						note={note}
						toggleImportanceOf={() => toggleImportanceOf(note.id)}
					/>
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

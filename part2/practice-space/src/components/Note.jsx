const Note = ({ note, toggleImportanceOf }) => {
	const label = note.important ? 'make not important' : 'make important'

	return (
		<>
			<li>{note.content}</li>
			<button onClick={toggleImportanceOf}>{label}</button>
		</>
	)
}

export default Note

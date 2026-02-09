const Note = ({ note, toggleImportanceOf }) => {
	const label = note.important ? 'make not important' : 'make important'

	return (
		<>
			<li className='note'>{note.content}</li>
			<button onClick={toggleImportanceOf}>{label}</button>
		</>
	)
}

export default Note

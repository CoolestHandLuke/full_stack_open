import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(url)
	return request.then(response => response.data)
}

const addPerson = newPersonObject => {
	const request = axios.post(url, newPersonObject)
	return request.then(response => response.data)
}

const updatePerson = (id, newPersonObject) => {
	const request = axios.put(`${url}/${id}`, newPersonObject)
	return request.then(response => response.data)
}

const deletePerson = id => {
	const request = axios.delete(`${url}/${id}`)
	return request.then(response => response.data)
}

export default {
	getAll,
	addPerson,
	deletePerson,
	updatePerson,
}

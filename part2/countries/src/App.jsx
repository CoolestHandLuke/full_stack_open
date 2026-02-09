import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesList from './components/CountriesList'
import SingleCountry from './components/SingleCountry'

function App() {
	const [value, setValue] = useState('')
	const [allCountries, setAllCountries] = useState({})
	const [countrySearch, setCountrySearch] = useState('')
	const [countries, setCountries] = useState([])
	const [singleCountry, setSingleCountry] = useState(false)
	const [singleCountryObject, setSingleCountryObject] = useState({})

	const url = 'https://studies.cs.helsinki.fi/restcountries/api'

	// Fetch all countries from the API

	useEffect(() => {
		axios
			.get(`${url}/all`)
			.then(response => setAllCountries(response.data))
			.catch(error =>
				console.error(
					'problem with fetching all countries from the API',
					error
				)
			)
	}, [])

	useEffect(() => {
		// IS THERE IS A LOGIC BUG IN HERE??? SEARCH RESULTS ARE NOT CONSISTENT WHEN CHAINED TOGETHER
		if (countrySearch) {
			// Find the country in the list of all of them
			console.log('searching for countries...')
			const countrySearchResults = allCountries.filter(country =>
				country.name.common.toLowerCase().includes(countrySearch)
			)
			// Check to see how many countries we got. Anything over 10 and we don't display them.
			if (countrySearchResults.length > 10) {
				setCountries(['Too many matches, specify another filter'])
				setSingleCountry(null)
			} else if (
				countrySearchResults.length > 1 &&
				countrySearchResults.length < 10
			) {
				setCountries(
					countrySearchResults.map(country => country.name.common)
				)
				setSingleCountry(null)
			} else {
				// Exactly one search result found
				console.log('only one country found!!')
				setSingleCountry(true)
				setSingleCountryObject(countrySearchResults[0])
			}
		}
	}, [countrySearch])

	const handleChange = event => {
		setValue(event.target.value)
	}

	const handleSubmit = event => {
		// Inputs are forced to lower case for ease of searching
		event.preventDefault()
		setCountrySearch(value.toLowerCase())
	}

	return (
		<>
			<div>find countries</div>
			<form action='submit' onSubmit={handleSubmit}>
				<input type='text' value={value} onChange={handleChange} />
			</form>

			{singleCountry ? (
				<SingleCountry country={singleCountryObject} />
			) : (
				<CountriesList countries={countries} />
			)}
		</>
	)
}

export default App

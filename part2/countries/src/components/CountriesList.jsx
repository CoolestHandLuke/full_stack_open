const CountriesList = ({ countries }) => {
	console.log(countries)
	return (
		<ul>
			{countries.map(country => {
				return <li key={country}>{country}</li>
			})}
		</ul>
	)
}

export default CountriesList

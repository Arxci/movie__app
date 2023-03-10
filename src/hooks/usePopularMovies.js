import { useState } from 'react'

const fetchPopularMovies = async (setPopularMovies) => {
	try {
		const data = await fetch(
			'//api.themoviedb.org/3/movie/popular?api_key=' +
				process.env.REACT_APP_API_KEY +
				'&language=en-US&page=1'
		)

		const movies = await data.json()

		setPopularMovies(movies.results)
	} catch (err) {
		console.log(err)
	}
}

const usePopularMovies = () => {
	const [popularMovies, setPopularMovies] = useState([])

	fetchPopularMovies(setPopularMovies)

	return popularMovies
}

export default usePopularMovies

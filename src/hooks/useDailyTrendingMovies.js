import { useState } from 'react'

const fetchTrendingMovies = async (setTrendingMovies) => {
	const data = await fetch(
		'//api.themoviedb.org/3/trending/movie/day?api_key=' +
			process.env.REACT_APP_API_KEY
	)

	const movies = await data.json()

	setTrendingMovies(movies.results)
}

const useDailyTrendingMovies = () => {
	const [trendingMovies, setTrendingMovies] = useState([])

	fetchTrendingMovies(setTrendingMovies)

	return { trendingMovies }
}

export default useDailyTrendingMovies

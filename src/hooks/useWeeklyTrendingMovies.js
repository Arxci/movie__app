import { useState } from 'react'

const fetchTrendingMovies = async (setTrendingMovies) => {
	const data = await fetch(
		'https://api.themoviedb.org/3/trending/movie/week?api_key=' +
			process.env.REACT_APP_API_KEY
	)

	const movies = await data.json()

	setTrendingMovies(movies.results)
}

const useWeeklyTrendingMovies = () => {
	const [trendingMovies, setTrendingMovies] = useState([])

	fetchTrendingMovies(setTrendingMovies)

	return { trendingMovies }
}

export default useWeeklyTrendingMovies

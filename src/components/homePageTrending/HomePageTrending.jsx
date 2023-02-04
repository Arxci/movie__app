import React, { useEffect, useState } from 'react'
import TabButton from '../button/TabButton'
import MovieCard from '../movieCard/MovieCard'
import { motion } from 'framer-motion'

const fetchWeeklyTrendingMovies = async (setMovies, signal) => {
	try {
		const data = await fetch(
			'//api.themoviedb.org/3/trending/all/week?api_key=' +
				process.env.REACT_APP_API_KEY,
			{ signal }
		)

		const movies = await data.json()

		setMovies(movies.results)
	} catch (err) {}
}

const fetchDailyTrendingMovies = async (setMovies, signal) => {
	try {
		const data = await fetch(
			'//api.themoviedb.org/3/trending/all/day?api_key=' +
				process.env.REACT_APP_API_KEY +
				'&language=en-US',
			{ signal }
		)

		const movies = await data.json()

		setMovies(movies.results)
	} catch (err) {}
}

const HomePageTrending = () => {
	const [currentTab, setCurrentTab] = useState(0)
	const [movies, setMovies] = useState([])

	const buttons = [
		{
			key: 0,
			name: 'Today',
		},
		{
			key: 1,
			name: 'This Week',
		},
	]

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		if (currentTab === 0) {
			fetchDailyTrendingMovies(setMovies, signal)
		} else {
			fetchWeeklyTrendingMovies(setMovies, signal)
		}

		return () => {
			controller.abort()
		}
	}, [currentTab, setMovies])

	return (
		<div className="trending">
			<section className="trending__wrapper container">
				<div className="trending__title">
					<h1>Trending</h1>
					<TabButton
						numOfElements={buttons}
						setCurrentState={setCurrentTab}
						currentState={currentTab}
						color="primary"
					/>
				</div>
				<motion.div className="trending__scroller">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</motion.div>
			</section>
		</div>
	)
}

export default HomePageTrending

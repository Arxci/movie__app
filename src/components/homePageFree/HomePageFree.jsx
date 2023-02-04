import React, { useEffect, useState } from 'react'
import TabButton from '../button/TabButton'
import MovieCard from '../movieCard/MovieCard'
import { motion } from 'framer-motion'

const discoverMovie = async (setMovies, signal, discover) => {
	try {
		const data = await fetch(
			'//api.themoviedb.org/3/discover/movie?api_key=' +
				process.env.REACT_APP_API_KEY +
				discover,
			{ signal }
		)

		const movies = await data.json()

		setMovies(movies.results)
	} catch (err) {}
}

const discoverTv = async (setMovies, signal, discover) => {
	try {
		const data = await fetch(
			'//api.themoviedb.org/3/discover/tv?api_key=' +
				process.env.REACT_APP_API_KEY +
				discover,
			{ signal }
		)

		const movies = await data.json()

		setMovies(movies.results)
	} catch (err) {}
}

const HomePageFree = () => {
	const [currentTab, setCurrentTab] = useState(0)
	const [movies, setMovies] = useState([])
	const buttons = [
		{
			key: 0,
			name: 'Movies',
		},
		{
			key: 1,
			name: 'TV',
		},
	]

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		if (currentTab === 0) {
			discoverMovie(
				setMovies,
				signal,
				'&watch_region=US&with_watch_monetization_types=free&language=en-US'
			)
		} else if (currentTab === 1) {
			discoverTv(
				setMovies,
				signal,
				'&watch_region=US&with_watch_monetization_types=free&language=en-US'
			)
		}

		return () => {
			controller.abort()
		}
	}, [currentTab, setMovies])

	return (
		<div className="free">
			<section className="free__wrapper container">
				<div className="free__title">
					<h1>Free To Watch</h1>
					<TabButton
						numOfElements={buttons}
						setCurrentState={setCurrentTab}
						currentState={currentTab}
						color="primary"
					/>
				</div>
				<motion.div className="free__scroller">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</motion.div>
			</section>
		</div>
	)
}

export default HomePageFree

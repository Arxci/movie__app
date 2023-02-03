import React, { useState, useEffect } from 'react'
import TabButton from '../button/TabButton'
import { motion } from 'framer-motion'
import MovieCard from '../movieCard/MovieCard'

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
	} catch (err) {
		console.log(err)
	}
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
	} catch (err) {
		console.log(err)
	}
}

const HomePagePopular = () => {
	const [currentTab, setCurrentTab] = useState(0)
	const [movies, setMovies] = useState([])
	const buttons = [
		{
			key: 0,
			name: 'Streaming',
		},
		{
			key: 1,
			name: 'On TV',
		},
		{
			key: 2,
			name: 'For Rent',
		},
		{
			key: 3,
			name: 'In Theaters',
		},
	]

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		if (currentTab === 0) {
			discoverMovie(
				setMovies,
				signal,
				'&watch_region=US&with_watch_monetization_types=flatrate'
			)
		} else if (currentTab === 1) {
			discoverTv(
				setMovies,
				signal,
				'&watch_region=US&with_watch_monetization_types=flatrate'
			)
		} else if (currentTab === 2) {
			discoverMovie(
				setMovies,
				signal,
				'&watch_region=US&with_watch_monetization_types=rent'
			)
		} else {
			discoverMovie(setMovies, signal, '&region=US&with_release_type=3|2')
		}

		return () => {
			controller.abort()
		}
	}, [currentTab, setMovies])

	return (
		<section className="popular">
			<div className="popular__wrapper container">
				<div className="popular__title">
					<h1>What's Popular</h1>
					<TabButton
						numOfElements={buttons}
						setCurrentState={setCurrentTab}
						currentState={currentTab}
						color="secondary"
					/>
				</div>
				<motion.div className="popular__scroller">
					{movies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} color="secondary" />
					))}
				</motion.div>
			</div>
		</section>
	)
}

export default HomePagePopular

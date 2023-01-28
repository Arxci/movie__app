import React, { useState, useEffect, useRef } from 'react'
import useDailyTrendingMovies from '../../hooks/useDailyTrendingMovies'
import useWeeklyTrendingMovies from '../../hooks/useWeeklyTrendingMovies'
import TabButton from '../button/TabButton'
import MovieCard from '../movieCard/MovieCard'
import { motion } from 'framer-motion'

const HomePageTrending = () => {
	const [currentTab, setCurrentTab] = useState(0)
	const movies = useRef([])
	const dailyMovies = useDailyTrendingMovies().trendingMovies
	const weeklyMovies = useWeeklyTrendingMovies().trendingMovies

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
		function fetch() {
			if (currentTab === 0) {
				movies.current = dailyMovies
			} else {
				movies.current = weeklyMovies
			}
		}

		fetch()

		return () => fetch()
	}, [currentTab, dailyMovies, weeklyMovies])

	return (
		<div className="trending">
			<section className="trending__wrapper container">
				<div className="trending__title">
					<h1>Trending</h1>
					<TabButton
						numOfElements={buttons}
						currentState={currentTab}
						setCurrentState={setCurrentTab}
					/>
				</div>
				<motion.div layout className="trending__scroller">
					{movies.current.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</motion.div>
			</section>
		</div>
	)
}

export default HomePageTrending

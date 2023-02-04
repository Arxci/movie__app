import React from 'react'
import { Link } from 'react-router-dom'
import useGetPosterImage from '../../../hooks/useGetPosterImage'
import useConvertDate from '../../../hooks/useConvertDate'
import { motion } from 'framer-motion'

const GetOverview = (card) => {
	if (card) {
		if (card.overview !== '') {
			return card.overview
		}
	}
	return 'We do not have an overview for this movie'
}

const DiscoverMovie = (movie) => {
	const actualMovie = movie.movie
	const image = useGetPosterImage(actualMovie, 200)
	var date = useConvertDate(actualMovie)
	const overview = GetOverview(actualMovie)
	const isTv = actualMovie.first_air_date !== undefined

	const item = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
		},
	}

	return (
		<Link to={isTv ? '/tv/' + actualMovie.id : '/movie/' + actualMovie.id}>
			<motion.div
				variants={item}
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.25 }}
				className="discover-movie"
			>
				<img
					className="discover-movie__image"
					loading="lazy"
					src={image}
					alt="movie"
				/>
				<div className="discover-movie__content">
					<h4 className="discover-movie__title">{actualMovie.name}</h4>
					<h4 className="discover-movie__date">{date}</h4>
					<p className="discover-movie__overview">{overview}</p>
				</div>
			</motion.div>
		</Link>
	)
}

export default DiscoverMovie

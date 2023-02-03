import React, { useRef } from 'react'
import useGetPosterImage from '../../hooks/useGetPosterImage'
import { motion, useInView } from 'framer-motion'
import Rating from '../rating/Rating'
import useConvertDate from '../../hooks/useConvertDate'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie, color }) => {
	var image = useGetPosterImage(movie, 300)
	var date = useConvertDate(movie)
	const ref = useRef(null)
	const isTv = movie.first_air_date !== undefined
	const isInView = useInView(ref)

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	}

	return (
		<motion.div
			ref={ref}
			layout
			variants={item}
			initial="hidden"
			animate={isInView ? 'visible' : ''}
			transition={{ duration: 0.2 }}
			className="card"
		>
			<div className="card__upper">
				<Link to={isTv ? '/tv/' + movie.id : '/movie/' + movie.id}>
					<img
						className="card__image"
						loading="lazy"
						src={image}
						alt="poster"
					/>
				</Link>
			</div>
			<div className="card__rating">
				<Rating movie={movie} />
			</div>
			<div className="card__lower">
				<h4 className={'card__name ' + color}>
					{movie.title === undefined ? movie.name : movie.title}
				</h4>
				<h4 className={'card__date ' + color}>{date}</h4>
			</div>
		</motion.div>
	)
}

export default MovieCard

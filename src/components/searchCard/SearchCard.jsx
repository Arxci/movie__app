import React from 'react'
import useConvertDate from '../../hooks/useConvertDate'
import useGetPosterImage from '../../hooks/useGetPosterImage'
import Rating from '../rating/Rating'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SearchCard = ({ card }) => {
	const image = useGetPosterImage(card, 500)
	var date = useConvertDate(card)
	const isTv = card.first_air_date !== undefined

	const item = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
		},
	}

	return (
		<motion.div
			layout
			variants={item}
			initial="hidden"
			animate="visible"
			transition={{ duration: 0.5 }}
			className="search-card"
		>
			<div className="search-card__upper">
				<Link to={isTv ? '/tv/' + card.id : '/movie/' + card.id}>
					<img className="card__image" src={image} alt="Poster" />
				</Link>
			</div>
			<div className="search-card__rating">
				<Rating movie={card} />
			</div>
			<div className="search-card__lower">
				<h4 className={'search-card__name '}>
					{card.title === undefined ? card.name : card.title}
				</h4>
				<h4 className={'search-card__date '}>{date}</h4>
			</div>
		</motion.div>
	)
}

export default SearchCard

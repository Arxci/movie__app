import React from 'react'
import useConvertDate from '../../hooks/useConvertDate'
import useGetPosterImage from '../../hooks/useGetPosterImage'
import Rating from '../rating/Rating'
import { motion } from 'framer-motion'

const SearchCard = ({ card }) => {
	const image = useGetPosterImage(card, 500)
	var date = useConvertDate(card)

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
				<img src={image} alt="Poster" />
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

import React from 'react'
import useConvertDate from '../../hooks/useConvertDate'
import useGetPosterImage from '../../hooks/useGetPosterImage'
import Rating from '../rating/Rating'

const SearchCard = ({ card }) => {
	const image = useGetPosterImage(card, 500)
	var date = useConvertDate(card)

	return (
		<div className="search-card">
			<div className="search-card__upper">
				<img src={image} alt={'This title doesnt have an image'} />
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
		</div>
	)
}

export default SearchCard

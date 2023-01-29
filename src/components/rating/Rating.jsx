import React, { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

function UpdateColor(rating) {
	var newColor = 'green'
	if (rating === 0) {
		newColor = 'default'
	} else if (rating <= 30) {
		newColor = 'red'
	} else if (rating <= 75) {
		newColor = 'yellow'
	}
	return newColor
}

function ConvertRatingRange(rating) {
	// prettier-ignore
	return (rating-0) * (180 - 0) /(100 - 0) + 0
}

function UpdateRotation(convertedRating, items) {
	items.forEach((item) => {
		if (item.current) {
			item.current.style.transform = 'rotate(' + convertedRating + 'deg)'
		}
	})
}

const Rating = ({ movie }) => {
	const rating = Math.floor(Math.round(movie.vote_average * 10 * 10) / 10)
	const convertedRating = ConvertRatingRange(rating)

	const half = useRef()
	const full = useRef()
	const mask = useRef()

	const color = UpdateColor(rating)

	const ref = useRef(null)
	const isInView = useInView(ref)

	useEffect(() => {
		if (isInView) {
			UpdateRotation(convertedRating, [half, full, mask])
		} else {
			UpdateRotation(0, [half, full, mask])
		}
	}, [isInView, convertedRating])

	return (
		<div ref={ref} className="rating">
			<div className={'circle__wrapper ' + color}>
				<div className="circle">
					<div className="mask half">
						<div ref={half} className={'fill ' + color}></div>
					</div>
					<div ref={mask} className="mask full">
						<div ref={full} className={'fill ' + color}></div>
					</div>
					<div className="inside-circle">
						<h2>{rating === 0 ? 'NA' : rating}</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Rating

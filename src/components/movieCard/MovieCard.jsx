import React from 'react'
import useGetPosterImage from '../../hooks/useGetPosterImage'

const MovieCard = ({ movie }) => {
	const image = useGetPosterImage(movie, 500)

	return (
		<div className="card">
			<div className="card__upper">
				<img src={image} />
			</div>
			<div className="card__lower">
				<h4 className="card__name">{movie.title}</h4>
				<h4 className="card__date">{movie.release_date}</h4>
			</div>
		</div>
	)
}

export default MovieCard

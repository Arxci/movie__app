import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetBackdropImage from '../../hooks/useGetBackdropImage'
import useGetPosterImage from '../../hooks/useGetPosterImage'

const Movie = () => {
	const { id } = useParams()
	const [card, setCard] = useState(null)
	const bannerImg = useGetBackdropImage(card, '1280')
	const posterImg = useGetPosterImage(card, '500')
	const banner = useRef()
	if (banner.current) {
		banner.current.style.backgroundImage = 'url(' + bannerImg + ')'
	}

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getData = async () => {
			const data = await fetch(
				'//api.themoviedb.org/3/movie/' +
					id +
					'?api_key=' +
					process.env.REACT_APP_API_KEY,
				{ signal }
			)

			const newCard = await data.json()
			console.log(newCard)

			setCard(newCard)
		}

		getData()

		return () => controller.abort()
	}, [id, setCard])

	return (
		<div className="movie-page">
			<div ref={banner} className="movie-page__banner">
				<div className="movie-page__wrapper">
					<div className="movie-page__container container">
						<div className="movie-page__left">
							<img src={posterImg} alt="poster" />
						</div>
						<div className="movie-page__right"></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Movie

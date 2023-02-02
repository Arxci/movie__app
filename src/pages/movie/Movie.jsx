import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetBackdropImage from '../../hooks/useGetBackdropImage'
import useGetPosterImage from '../../hooks/useGetPosterImage'
import Rating from '../../components/rating/Rating'

const ConvertRunTime = (card) => {
	if (card) {
		const runtime = card.runtime
		const hours = runtime / 60
		const rhours = Math.floor(hours)
		const minutes = (hours - rhours) * 60
		const rminutes = Math.round(minutes)

		return rhours + 'h ' + rminutes + 'm'
	}
	return ''
}

const ConvertDateFormat = (card) => {
	if (card) {
		const releaseDate = card.release_date.split('-')
		const newDate = releaseDate[1] + '/' + releaseDate[2] + '/' + releaseDate[0]
		return newDate
	}
	return ''
}

const GetProductionCountries = (card) => {
	if (card) {
		const company = card.production_countries[0]
		return company.iso_3166_1
	}
	return ''
}

const GetGenres = (card) => {
	if (card) {
		var int = 0
		var tempGenres = ''
		card.genres.forEach((genre) => {
			if (int < 3) {
				tempGenres = tempGenres + '' + genre.name
				if (int < 2) {
					tempGenres = tempGenres + ', '
				}

				int += 1
			}
		})
		return tempGenres
	}
	return ''
}

const Movie = () => {
	const { id } = useParams()
	const [card, setCard] = useState(null)
	const [certification, setCertification] = useState('')
	const bannerImg = useGetBackdropImage(card, '1280')
	const posterImg = useGetPosterImage(card, '500')
	const playtime = ConvertRunTime(card)
	const date = ConvertDateFormat(card)
	const productionCountries = GetProductionCountries(card)
	const genres = GetGenres(card)

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

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getData = async () => {
			const data = await fetch(
				'//api.themoviedb.org/3/movie/' +
					id +
					'/release_dates?api_key=' +
					process.env.REACT_APP_API_KEY,
				{ signal }
			)

			const releases = await data.json()

			var release = releases.results.filter((rel) => {
				return rel.iso_3166_1 === 'US'
			})

			if (release.length !== 0) {
				setCertification(release[0].release_dates[0].certification)
			} else {
				setCertification('')
			}
		}

		getData()

		return () => controller.abort()
	}, [id, setCertification])

	return (
		<div className="movie-page">
			<div ref={banner} className="movie-page__banner">
				{card && (
					<div className="movie-page__wrapper">
						<div className="movie-page__container container">
							<div className="movie-page__left">
								<img src={posterImg} alt="poster" />
							</div>
							<div className="movie-page__right">
								<div className="movie-page__content">
									<div>
										<h2 className="movie-page__title">
											{card.original_title}
											<span>
												{' (' + card.release_date.substring(0, 4) + ')'}
											</span>
										</h2>
										<div className="movie-page__subtitle">
											<p className="movie-page__release">
												<span>{certification + ' '}</span>
												{date + ' (' + productionCountries + ') '}
											</p>
											<span className="movie-page__subtitle__spacer"></span>
											<p className="movie-page__genre">{genres}</p>
											<span className="movie-page__subtitle__spacer"></span>
											<p className="movie-page__playtime">{playtime}</p>
										</div>
									</div>
									<div className="movie-page__rating__wrapper">
										<div className="movie-page__rating">
											<Rating movie={card} />
										</div>
										<p>User Score</p>
									</div>

									<p className="movie-page__tagline">{card.tagline}</p>
									<h2 className="movie-page__section">Overview</h2>
									<p className="movie-page__overview">{card.overview}</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Movie

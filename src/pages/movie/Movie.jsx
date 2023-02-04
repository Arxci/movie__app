import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetBackdropImage from '../../hooks/useGetBackdropImage'
import useGetPosterImage from '../../hooks/useGetPosterImage'
import Rating from '../../components/rating/Rating'
import PeopleCard from '../../components/peopleCard/PeopleCard'

const ConvertRunTime = (card) => {
	if (card) {
		if (card.runtime === undefined) {
			return ''
		}
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
		if (card.first_air_date !== undefined) {
			if (card.first_air_date === '') {
				return 'We do not have a release date'
			}
			const releaseDate = card.first_air_date.split('-')
			const newDate =
				releaseDate[1] + '/' + releaseDate[2] + '/' + releaseDate[0]
			return '(' + newDate + ')'
		}
		if (card.release_date === '') {
			return 'We do not have a release date'
		}
		const releaseDate = card.release_date.split('-')
		const newDate = releaseDate[1] + '/' + releaseDate[2] + '/' + releaseDate[0]
		return '(' + newDate + ')'
	}
	return ''
}

const GetProductionCountries = (card) => {
	if (card) {
		const country = card.production_countries[0]
		if (country === undefined) {
			return ''
		}
		return '(' + country.iso_3166_1 + ')'
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

const GetOverview = (card) => {
	if (card) {
		if (card.overview !== '') {
			return card.overview
		}
	}
	return 'We do not have an overview for this movie'
}

const GetTitle = (card) => {
	if (card) {
		if (card.original_name !== undefined) {
			return card.original_name
		}
		return card.original_title
	}
	return ''
}

const GetOrigDate = (card) => {
	if (card) {
		if (card.first_air_date !== undefined) {
			if (card.first_air_date === '') {
				return ''
			}
			return card.first_air_date
		}
		if (card.release_date === '') {
			return ''
		}
		return card.release_date
	}
	return ''
}

const Movie = ({ cardEndpoint, releaseDateEndpoint, castEndpoint }) => {
	const { id } = useParams()
	const [card, setCard] = useState(null)
	const [cast, setCast] = useState(null)
	const [certification, setCertification] = useState('')
	const bannerImg = useGetBackdropImage(card, '1280')
	const posterImg = useGetPosterImage(card, '500')
	const playtime = ConvertRunTime(card)
	const date = ConvertDateFormat(card)
	const productionCountries = GetProductionCountries(card)
	const genres = GetGenres(card)
	const overview = GetOverview(card)
	const origDate = GetOrigDate(card)
	const title = GetTitle(card)
	console.log(card)
	const banner = useRef()
	if (banner.current) {
		banner.current.style.backgroundImage = 'url(' + bannerImg + ')'
	}

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getData = async () => {
			try {
				const data = await fetch(
					cardEndpoint[0] +
						id +
						cardEndpoint[1] +
						process.env.REACT_APP_API_KEY,
					{ signal }
				)

				const newCard = await data.json()

				setCard(newCard)
			} catch (err) {
				console.log(err)
			}
		}

		getData()

		return () => controller.abort()
	}, [id, setCard, cardEndpoint])

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getData = async () => {
			try {
				const data = await fetch(
					castEndpoint[0] +
						id +
						castEndpoint[1] +
						process.env.REACT_APP_API_KEY,
					{ signal }
				)

				const newCast = await data.json()

				var temp = []
				var int = 0

				newCast.cast.forEach((person) => {
					if (int < 20) {
						temp.push(person)
						int += 1
					} else {
						return
					}
				})
				setCast(temp)
			} catch (err) {
				console.log(err)
			}
		}

		getData()

		return () => controller.abort()
	}, [id, setCast, castEndpoint])

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getData = async () => {
			try {
				const data = await fetch(
					releaseDateEndpoint[0] +
						id +
						releaseDateEndpoint[1] +
						process.env.REACT_APP_API_KEY,
					{ signal }
				)

				const releases = await data.json()

				var release = releases.results.filter((rel) => {
					return rel.iso_3166_1 === 'US'
				})

				if (release[0]) {
					if (release[0].release_dates === undefined) {
						setCertification(release[0].rating)
					} else {
						setCertification(release[0].release_dates[0].certification)
					}
				} else {
					setCertification('')
				}
			} catch (err) {
				console.log(err)
			}
		}

		getData()

		return () => controller.abort()
	}, [id, setCertification, releaseDateEndpoint])

	return (
		<div className="movie-page">
			<div ref={banner} className="movie-page__banner">
				{card && (
					<div className="movie-page__wrapper">
						<div className="movie-page__container container">
							<div className="movie-page__left">
								<img src={posterImg} loading="lazy" alt="poster" />
							</div>
							<div className="movie-page__right hide-for-mobile">
								<div className="movie-page__content">
									<div>
										<h2 className="movie-page__title">
											{title}
											<span>{' ' + origDate.substring(0, 4) + ''}</span>
										</h2>
										<div className="movie-page__subtitle">
											<p className="movie-page__release">
												<span className={certification === '' ? 'none' : ''}>
													{certification + ' '}
												</span>
												{date + ' ' + productionCountries + ' '}
											</p>
											{genres !== '' && (
												<span className="movie-page__subtitle__spacer"></span>
											)}

											{genres !== '' && (
												<p className="movie-page__genre">{genres}</p>
											)}

											{playtime !== '' && (
												<span className="movie-page__subtitle__spacer"></span>
											)}
											{playtime !== '' && (
												<p className="movie-page__playtime">{playtime}</p>
											)}
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
									<p className="movie-page__overview">{overview}</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			{card && (
				<div className="movie-page__lower-info hide-for-desktop">
					<h2 className="movie-page__lower-info-title">
						{title}
						<span>{' ' + origDate.substring(0, 4) + ''}</span>
					</h2>
					<div className="movie-page__lower-info-rating__wrapper">
						<div className="movie-page__lower-info-rating">
							<Rating movie={card} />
						</div>
						<p>User Score</p>
					</div>
					<div className="movie-page__lower-info-genre__wrapper">
						<p className="movie-page__lower-info-release">
							<span className={certification === '' ? 'none' : ''}>
								{certification + ' '}
							</span>
							{date + ' ' + productionCountries + ' '}
						</p>
						<span className="movie-page__subtitle__spacer"></span>
						<p className="movie-page__lower-info-genre">{genres}</p>
						<p className="movie-page__lower-info-playtime">{playtime}</p>
					</div>
					<div className="movie-page__lower-info-content">
						<p className="movie-page__lower-info-tagline">{card.tagline}</p>
						<h2 className="movie-page__lower-info-section">Overview</h2>
						<p className="movie-page__lower-info-overview">{overview}</p>
					</div>
				</div>
			)}
			<div className="movie-page__cast">
				<div className="movie-page__cast__wrapper  container">
					<h2>Cast</h2>
					<div className="movie-page__scroller">
						{cast &&
							cast.map((person) => (
								<PeopleCard key={person.id} person={person} setWidth={true} />
							))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Movie

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../../components/movieCard/MovieCard'
import useGetPersonImage from '../../hooks/useGetPersonImage'

const GetGender = (person) => {
	if (person) {
		const genders = ['Female', 'Male', 'Other']
		return genders[person.gender - 1]
	}
	return ''
}

const GetKnownFor = (person) => {
	if (person) {
		return person.known_for_department
	}
	return ''
}

const GetBirthday = (person) => {
	if (person) {
		return person.birthday
	}
	return ''
}

const GetPlaceOfBirth = (person) => {
	if (person) {
		return person.place_of_birth
	}
	return ''
}

const Person = () => {
	const [person, setPerson] = useState(null)
	const [movies, setMovies] = useState([])
	const image = useGetPersonImage(person, 500)
	const knownFor = GetKnownFor(person)
	const gender = GetGender(person)
	const birthday = GetBirthday(person)
	const placeOfBirth = GetPlaceOfBirth(person)
	const { id } = useParams()

	console.log(person)

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getData = async () => {
			try {
				const data = await fetch(
					'//api.themoviedb.org/3/person/' +
						id +
						'?api_key=' +
						process.env.REACT_APP_API_KEY,
					{ signal }
				)

				const newPerson = await data.json()
				setPerson(newPerson)
			} catch (err) {
				console.log(err)
			}
		}

		getData()

		return () => controller.abort()
	}, [setPerson, id])

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getData = async () => {
			try {
				const data = await fetch(
					'//api.themoviedb.org/3/person/' +
						id +
						'/combined_credits?api_key=' +
						process.env.REACT_APP_API_KEY +
						'&sort_by=popularity.desc',
					{ signal }
				)

				const newMovies = await data.json()
				setMovies(newMovies.cast)
			} catch (err) {
				console.log(err)
			}
		}

		getData()

		return () => controller.abort()
	}, [setMovies, id])

	return (
		<div className="person-page">
			{person && (
				<div className="person-page__wrapper">
					<div className="person-page__container container">
						<div className="person-page__left">
							<img
								src={image}
								loading="lazy"
								alt="person"
								className="person-page__image"
							/>
							<div className="person-page__details">
								<h3 className="hide-for-desktop">{person.name}</h3>
								<h4>Personal Info</h4>
								<div className="person-page__detail">
									<p>Known For</p>
									<p>{knownFor}</p>
								</div>
								<div className="person-page__detail">
									<p>Gender</p>
									<p>{gender}</p>
								</div>
								<div className="person-page__detail">
									<p>Birthday</p>
									<p>{birthday}</p>
								</div>
								<div className="person-page__detail">
									<p>Place of Birth</p>
									<p>{placeOfBirth}</p>
								</div>
							</div>
						</div>
						<div className="person-page__right">
							<h3 className="hide-for-mobile">{person.name}</h3>
							<div className="person-page__biography">
								<h4>Biography</h4>
								<p>{person.biography}</p>
							</div>
							<div className="person-page__movie__wrapper">
								<h2>Also Known For</h2>
								<div className="person-page__movie__scroller">
									{movies &&
										movies.map((movie) => (
											<MovieCard key={movie.id} movie={movie} />
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Person

/*
<div className="person-page__movie__wrapper">
<h2>Also Known For</h2>
<div className="person-page__movie__scroller">
    {movies &&
        movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
</div>
</div>
*/

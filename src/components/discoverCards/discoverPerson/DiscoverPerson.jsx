import React from 'react'
import { Link } from 'react-router-dom'
import useGetPersonImage from '../../../hooks/useGetPersonImage'
import { motion } from 'framer-motion'

const GetKnownFor = (person) => {
	if (person) {
		var tempDetails = ''
		if (person.known_for !== undefined) {
			person.known_for.forEach((item) => {
				if (tempDetails !== '') {
					tempDetails = tempDetails + ', '
				}
				if (item.name === undefined) {
					tempDetails = tempDetails + item.title
				} else {
					tempDetails = tempDetails + item.name
				}
			})
		}
	}
	return tempDetails
}

const DiscoverPerson = (person) => {
	const actualPerson = person.person
	const image = useGetPersonImage(actualPerson, 200)
	const details = GetKnownFor(actualPerson)
	const item = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
		},
	}

	return (
		<Link to={'/person/' + actualPerson.id}>
			<motion.div
				variants={item}
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.25 }}
				className="discover-movie"
			>
				<img
					className="discover-movie__image"
					loading="lazy"
					src={image}
					alt="person"
				/>
				<div className="discover-movie__content">
					<h4 className="discover-movie__title">{actualPerson.name}</h4>
					<h4 className="discover-movie__date">
						{actualPerson.known_for_department}
					</h4>
					<p className="discover-movie__overview">{details}</p>
				</div>
			</motion.div>
		</Link>
	)
}

export default DiscoverPerson

import React, { useMemo } from 'react'
import useGetPersonImage from '../../hooks/useGetPersonImage'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const PeopleCard = ({ person }) => {
	const image = useGetPersonImage(person, 400)
	const details = useMemo(() => {
		const maxNumOfCharacters = 30

		var tempDetails = ''
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

		if (tempDetails.length >= maxNumOfCharacters) {
			tempDetails = tempDetails.substring(0, maxNumOfCharacters)
		}

		tempDetails = tempDetails + '...'

		return tempDetails
	}, [person])

	const item = {
		hidden: { opacity: 0, scale: 0.98 },
		visible: {
			opacity: 1,
			scale: 1,
		},
	}

	return (
		<motion.div
			variants={item}
			initial="hidden"
			animate="visible"
			transition={{ duration: 0.25 }}
			className="person"
		>
			<div className="person__upper">
				<Link to="/person">
					<img className="person__image" src={image} alt="" />
				</Link>
			</div>
			<div className="person__lower">
				<Link to="/person">
					<h4 className="person__name">{person.name}</h4>
				</Link>

				<h4 className="person__details">{details}</h4>
			</div>
		</motion.div>
	)
}

export default PeopleCard

import React, { useEffect, useState } from 'react'
import Dropdown from '../../components/filterPanel/dropdown/Dropdown'
import FilterPanel from '../../components/filterPanel/FilterPanel'
import SearchCard from '../../components/searchCard/SearchCard'

const Search = ({ title, endpoint, genreId, languageId, popularityID }) => {
	const [sortBy, setSortBy] = useState('Popularity Descending')
	const [languages, setLanguages] = useState('None Selected')
	const [genres, setGenres] = useState('None Selected')
	const [filteredCards, setFilteredCards] = useState([])

	const filterItems = [
		{
			key: 0,
			title: 'Sort',
			initialState: true,
			sections: [
				{
					key: 0,
					title: 'Sort Results By',
					elements: [
						<Dropdown
							key={0}
							items={popularityID}
							currentState={sortBy}
							stateChanged={setSortBy}
						/>,
					],
				},
			],
		},
		{
			key: 1,
			title: 'Filters',
			initialState: true,
			sections: [
				{
					key: 0,
					title: 'Genres',
					elements: [
						<Dropdown
							key={1}
							items={genreId}
							currentState={genres}
							stateChanged={setGenres}
						/>,
					],
				},
				{
					key: 1,
					title: 'Language',
					elements: [
						<Dropdown
							key={1}
							items={languageId}
							currentState={languages}
							stateChanged={setLanguages}
						/>,
					],
				},
			],
		},
	]

	const UpdateFilters = async () => {
		var l_ID = languageId.filter((language) => {
			return language.name === languages
		})[0].id

		if (l_ID !== '') {
			l_ID = '&with_original_language=' + l_ID
		}

		var g_ID = genreId.filter((genre) => {
			return genre.name === genres
		})[0].id

		if (g_ID !== '') {
			g_ID = '&with_genres=' + g_ID
		}

		var s_ID = popularityID.filter((sort) => {
			return sort.name === sortBy
		})[0].id

		if (s_ID !== '') {
			s_ID = '&sort_by=' + s_ID
		}

		const data = await fetch(
			endpoint + process.env.REACT_APP_API_KEY + l_ID + s_ID + g_ID
		)

		const cards = await data.json()

		setFilteredCards(cards.results)
	}

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		const getData = async () => {
			const data = await fetch(
				endpoint + process.env.REACT_APP_API_KEY + '&sort_by=popularity.desc',
				{ signal }
			)

			const cards = await data.json()

			setFilteredCards(cards.results)
		}

		getData()

		return () => controller.abort()
	}, [setFilteredCards, endpoint])

	return (
		<div className="search">
			<div className="search__wrapper container">
				<div className="search__container">
					<div className="search__upper">
						<h1 className="search__title">{title}</h1>
					</div>
					<div className="search__lower">
						<div className="search__left">
							{filterItems.map((item) => (
								<FilterPanel key={item.key} filter={item} />
							))}
							<button
								className="search__button"
								onClick={() => UpdateFilters()}
							>
								Search
							</button>
						</div>
						<div className="search__right">
							{filteredCards.map((card) => (
								<SearchCard key={card.id} card={card} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Search

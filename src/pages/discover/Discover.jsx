import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DiscoverMovie from '../../components/discoverCards/discoverMovie/DiscoverMovie'
import ReactPaginate from 'react-paginate'
import DiscoverPerson from '../../components/discoverCards/discoverPerson/DiscoverPerson'

const getMovies = async (
	setCards,
	search,
	signal,
	currentPage,
	setNumOfPages
) => {
	try {
		const data = await fetch(
			'//api.themoviedb.org/3/search/movie?api_key=' +
				process.env.REACT_APP_API_KEY +
				'&language=en-US' +
				'&query=' +
				search +
				'&page=' +
				currentPage,
			{ signal }
		)

		const newCards = await data.json()

		setCards(newCards.results)
		setNumOfPages(newCards.total_pages)

		window.scrollTo(0, 0)
	} catch (err) {}
}

const getShows = async (
	setCards,
	search,
	signal,
	currentPage,
	setNumOfPages
) => {
	try {
		const data = await fetch(
			'//api.themoviedb.org/3/search/tv?api_key=' +
				process.env.REACT_APP_API_KEY +
				'&language=en-US' +
				'&query=' +
				search +
				'&page=' +
				currentPage,
			{ signal }
		)

		const newCards = await data.json()

		setCards(newCards.results)
		setNumOfPages(newCards.total_pages)

		window.scrollTo(0, 0)
	} catch (err) {}
}

const getPeople = async (
	setCards,
	search,
	signal,
	currentPage,
	setNumOfPages
) => {
	try {
		const data = await fetch(
			'//api.themoviedb.org/3/search/person?api_key=' +
				process.env.REACT_APP_API_KEY +
				'&query=' +
				search +
				'&page=' +
				currentPage,
			{ signal }
		)

		const newCards = await data.json()

		setCards(newCards.results)
		setNumOfPages(newCards.total_pages)

		window.scrollTo(0, 0)
	} catch (err) {}
}

const Discover = () => {
	const { search } = useParams()
	const [cards, setCards] = useState([])
	const [currentTab, setCurrentTab] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)
	const [numOfPages, setNumOfPages] = useState(0)

	const handlePageClick = (event) => {
		setCurrentPage(event.selected)
	}

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		if (currentTab === 0) {
			getMovies(setCards, search, signal, currentPage + 1, setNumOfPages)
		} else if (currentTab === 1) {
			getShows(setCards, search, signal, currentPage + 1, setNumOfPages)
		} else if (currentTab === 2) {
			getPeople(setCards, search, signal, currentPage + 1, setNumOfPages)
		}

		return () => controller.abort()
	}, [search, setCards, currentTab, currentPage, setNumOfPages])

	return (
		<div className="discover">
			<div className="discover__wrapper">
				<div className="discover__container container">
					<div className="discover__left">
						<h3>Search Results</h3>
						<ul className="discover__search-options">
							<li
								className={
									currentTab === 0
										? 'discover__search-option active'
										: 'discover__search-option'
								}
								onClick={() => {
									setCurrentTab(0)
									setCurrentPage(0)
								}}
							>
								<h4>Movies</h4>
							</li>
							<li
								className={
									currentTab === 1
										? 'discover__search-option active'
										: 'discover__search-option'
								}
								onClick={() => {
									setCurrentTab(1)
									setCurrentPage(0)
								}}
							>
								<h4>TV Shows</h4>
							</li>
							<li
								className={
									currentTab === 2
										? 'discover__search-option active'
										: 'discover__search-option'
								}
								onClick={() => {
									setCurrentTab(2)
									setCurrentPage(0)
								}}
							>
								<h4>People</h4>
							</li>
						</ul>
					</div>
					<div className="discover__right">
						{(currentTab === 0 || currentTab === 1) &&
							cards &&
							cards.map((card) => <DiscoverMovie key={card.id} movie={card} />)}

						{currentTab === 2 &&
							cards &&
							cards.map((card) => (
								<DiscoverPerson key={card.id} person={card} />
							))}
					</div>
				</div>
				{numOfPages > 1 && (
					<div id="container" className="pagination">
						<ReactPaginate
							breakLabel="..."
							nextLabel={<i className="fa-solid fa-arrow-right"></i>}
							onPageChange={handlePageClick}
							pageRangeDisplayed={2}
							forcePage={currentPage}
							marginPagesDisplayed={1}
							pageCount={numOfPages}
							previousLabel={<i className="fa-solid fa-arrow-left"></i>}
							containerClassName="pagination"
							previousClassName="previous__link"
							nextClassName="next__link"
							previousLinkClassName={'pagination__link'}
							nextLinkClassName={'pagination__link'}
							disabledClassName={'pagination__link--disabled'}
							activeClassName={'pagination__link--active'}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default Discover

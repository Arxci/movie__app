import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import PeopleCard from '../../components/peopleCard/PeopleCard'

const fetchPopularPeople = async (setPeople, setNumOfPages, signal, page) => {
	try {
		const data = await fetch(
			'//api.themoviedb.org/3/person/popular?api_key=' +
				process.env.REACT_APP_API_KEY +
				'&language=en-US&page=' +
				page,
			{ signal }
		)

		const people = await data.json()

		setPeople(people.results)
		setNumOfPages(people.total_pages)
	} catch (err) {}
}

const PopularPeople = () => {
	const [people, setPeople] = useState([])
	const [numOfPages, setNumOfPages] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)
	window.scrollTo(0, 0)

	const handlePageClick = (event) => {
		setCurrentPage(event.selected)
	}

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		fetchPopularPeople(setPeople, setNumOfPages, signal, currentPage + 1)
		window.scrollTo(0, 0)

		return () => controller.abort()
	}, [currentPage])

	return (
		<div className="people">
			<div className="people__wrapper container">
				<div className="people__container">
					{people.map((person) => (
						<PeopleCard key={person.id} person={person} setWidth={false} />
					))}
				</div>
				{numOfPages > 0 && (
					<div id="container" className="pagination">
						<ReactPaginate
							breakLabel="..."
							nextLabel={<i className="fa-solid fa-arrow-right"></i>}
							onPageChange={handlePageClick}
							pageRangeDisplayed={2}
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

export default PopularPeople

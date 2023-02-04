import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomePageBanner = () => {
	const [inputValue, setInputValue] = useState('-')
	const navigate = useNavigate()

	const OnKeyPressed = (e) => {
		if (e.key === 'Enter') {
			navigate('/discover/' + e.target.value, { replace: true })
		}
	}

	return (
		<div className="banner">
			<section className="welcome__wrapper container">
				<div className="welcome__text">
					<h1>Welcome.</h1>
					<h4>
						Millions of movies, TV shows, and people to discover. Explore now.
					</h4>
				</div>
				<div className="welcome__search">
					<div className="welcome__search__wrapper">
						<input
							className="welcome__search__input hide-for-mobile"
							placeholder="Search for a movie, tv show, person..."
							type="text"
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={(e) => OnKeyPressed(e)}
						/>
						<input
							className="welcome__search__input hide-for-desktop"
							placeholder="Search..."
							type="text"
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={(e) => OnKeyPressed(e)}
						/>
						<Link to={'/discover/' + inputValue}>
							<button className="welcome__search__button">Search</button>
						</Link>
					</div>
				</div>
			</section>
			<section className="top-rated__wrapper container">
				<div className="top-rated__text">
					<h1>Top Rated Movies</h1>
				</div>
				<Link to="/search/movies" className="top-rated__button">
					<h4>Check It Out</h4>
					<i className="fa-solid fa-arrow-right"></i>
				</Link>
			</section>
		</div>
	)
}

export default HomePageBanner

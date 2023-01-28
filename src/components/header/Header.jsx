import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<div className="header">
			<nav className="header__nav container">
				<div className="nav__wrapper">
					<Link to="/">
						<h1 className="nav__link">MOVIES & MORE</h1>
					</Link>
					<ul className="nav__list">
						<li className="nav__item">
							<Link to="/">
								<h4 className="nav__link">Movies</h4>
							</Link>
						</li>
						<li className="nav__item">
							<Link to="/">
								<h4 className="nav__link">TV Shows</h4>
							</Link>
						</li>
						<li className="nav__item">
							<Link to="/">
								<h4 className="nav__link">People</h4>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}

export default Header

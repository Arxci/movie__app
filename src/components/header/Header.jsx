import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	const [currentVisibility, setCurrentVisibility] = useState('show')
	const [hamburgerOpen, setHamburgerOpen] = useState(false)
	var lastScroll = useRef(0)

	useEffect(() => {
		function OnScroll() {
			var st = window.pageYOffset || document.documentElement.scrollTop
			if (st > lastScroll.current && st > 60) {
				setCurrentVisibility('hide')
			} else if (st < lastScroll.current) {
				setCurrentVisibility('show')
			}
			lastScroll.current = st < 0 ? 0 : st
		}

		window.addEventListener('scroll', () => OnScroll())
		window.addEventListener('touchmove', () => OnScroll())

		return () => {
			window.removeEventListener('scroll', () => OnScroll())
			window.removeEventListener('touchmove', () => OnScroll())
		}
	}, [setCurrentVisibility, lastScroll])

	return (
		<div className="header">
			<div className={'header__wrapper ' + currentVisibility}>
				<nav className="header__nav">
					<div className="nav__wrapper container">
						<Link to="/">
							<h1 className="nav__link">MOVIES & MORE</h1>
						</Link>
						<ul className="nav__list">
							<li className="nav__item  hide-for-mobile">
								<Link to="/search/movies">
									<h4 className="nav__link">Movies</h4>
								</Link>
							</li>
							<li className="nav__item  hide-for-mobile">
								<Link to="/search/tv">
									<h4 className="nav__link">TV Shows</h4>
								</Link>
							</li>
							<li className="nav__item  hide-for-mobile">
								<Link to="/person">
									<h4 className="nav__link">People</h4>
								</Link>
							</li>
							<li
								className="nav__item hamburger hide-for-desktop"
								onClick={() => setHamburgerOpen(!hamburgerOpen)}
							>
								<i className="fa-solid fa-bars "></i>
							</li>
						</ul>
					</div>
				</nav>
			</div>
			<div
				onClick={() => setHamburgerOpen(false)}
				className={hamburgerOpen ? 'hamburger__list open' : 'hamburger__list'}
			>
				<ul className="hamburger__menu">
					<li className="hamburger__item">
						<Link to="/search/movies" onClick={() => setHamburgerOpen(false)}>
							<h4 className="hamburger__link">Movies</h4>
						</Link>
					</li>
					<li className="hamburger__item">
						<Link to="/search/tv" onClick={() => setHamburgerOpen(false)}>
							<h4 className="hamburger__link">TV Shows</h4>
						</Link>
					</li>
					<li className="hamburger__item">
						<Link to="/person" onClick={() => setHamburgerOpen(false)}>
							<h4 className="hamburger__link">People</h4>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Header

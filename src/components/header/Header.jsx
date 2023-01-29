import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	const [currentVisibility, setCurrentVisibility] = useState('show')
	const [hamburgerOpen, setHamburgerOpen] = useState(false)
	var lastScroll = useRef(0)

	useEffect(() => {
		function OnScroll() {
			var st = window.pageYOffset || document.documentElement.scrollTop
			if (st > lastScroll.current) {
				setCurrentVisibility('hide')
			} else if (st < lastScroll.current) {
				setCurrentVisibility('show')
			}
			lastScroll.current = st < 0 ? 0 : st
		}

		window.addEventListener('scroll', (e) => OnScroll(e))

		return () => window.removeEventListener('scroll', OnScroll())
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
								<Link to="/">
									<h4 className="nav__link">Movies</h4>
								</Link>
							</li>
							<li className="nav__item  hide-for-mobile">
								<Link to="/">
									<h4 className="nav__link">TV Shows</h4>
								</Link>
							</li>
							<li className="nav__item  hide-for-mobile">
								<Link to="/">
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
			<ul
				className={hamburgerOpen ? 'hamburger__list open' : 'hamburger__list'}
			>
				<li></li>
			</ul>
		</div>
	)
}

export default Header

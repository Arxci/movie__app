import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<nav className="footer">
			<div className="footer__container container">
				<div className="footer__wrapper">
					<Link to="/">
						<h1 className="nav__link">MOVIES & MORE</h1>
					</Link>
				</div>
			</div>
		</nav>
	)
}

export default Footer

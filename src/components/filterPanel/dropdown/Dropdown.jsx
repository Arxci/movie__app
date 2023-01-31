import React, { useState } from 'react'

const Dropdown = ({ items, currentState, stateChanged }) => {
	const [isOpen, setIsOpen] = useState(false)

	const OnUpdateState = (newState) => {
		stateChanged(newState)
		setIsOpen(false)
	}

	return (
		<div className="dropdown">
			<div className="dropdown__wrapper">
				<div className="dropdown__title" onClick={() => setIsOpen(!isOpen)}>
					<h4>{currentState}</h4>
					<i className="fa-solid fa-caret-down"></i>
				</div>
				<div
					className={
						isOpen ? 'dropdown__container open' : 'dropdown__container'
					}
				>
					<ul className="dropdown__list">
						{items &&
							items.map((item) => (
								<li
									className={
										item.name === currentState
											? 'dropdown__item active'
											: 'dropdown__item'
									}
									key={item.key}
									onClick={() => OnUpdateState(item.name)}
								>
									<p>{item.name}</p>
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Dropdown

import React, { useState } from 'react'

const FilterPanel = ({ filter }) => {
	const [isOpen, setIsOpen] = useState(filter.initialState)

	return (
		<div className="filter-panel">
			<div className="filter-panel__wrapper">
				<div className="filter-panel__upper" onClick={() => setIsOpen(!isOpen)}>
					<h3>{filter.title}</h3>
					<i
						className={
							isOpen
								? 'fa-solid fa-chevron-right open'
								: 'fa-solid fa-chevron-right'
						}
					></i>
				</div>
				<div
					className={
						isOpen ? 'filter-panel__lower open' : 'filter-panel__lower'
					}
				>
					{filter.sections.map((section) => (
						<div key={section.key} className="filter-panel__section">
							<h4 className="filter-panel__section-title">{section.title}</h4>
							{section.elements.map((element) => element)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default FilterPanel

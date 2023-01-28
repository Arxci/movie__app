import React, { useRef } from 'react'

const TabButtonElement = ({ button, isActive, onPressed }) => {
	const currentElement = useRef()

	return (
		<div
			ref={currentElement}
			onClick={() => onPressed(button, currentElement.current)}
			className={isActive ? 'button__element active' : 'button__element'}
		>
			{button.name}
		</div>
	)
}

export default TabButtonElement

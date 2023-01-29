import React, { useRef } from 'react'

const TabButtonElement = ({ button, isActive, onPressed, color }) => {
	const currentElement = useRef()

	return (
		<div
			ref={currentElement}
			onClick={() => onPressed(button, currentElement.current)}
			className={
				isActive
					? 'button__element active ' + color
					: 'button__element ' + color
			}
		>
			{button.name}
		</div>
	)
}

export default TabButtonElement

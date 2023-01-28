import React, { useRef } from 'react'
import TabButtonElement from './buttonElement/TabButtonElement'

const TabButton = ({ numOfElements, currentState, setCurrentState }) => {
	const currentButton = useRef()
	const buttonContainer = useRef()

	function UpdateCurrentButton(newButton, newElement) {
		if (newButton.key !== currentState) {
			setCurrentState(newButton.key)

			const newWidth = newElement.offsetWidth

			var totalWidth = 0
			const buttons = buttonContainer.current.children

			for (let i = 0; i < numOfElements.length; i++) {
				if (numOfElements[i].key === newButton.key) {
					break
				}
				totalWidth += buttons[i].offsetWidth
			}

			// prettier-ignore
			currentButton.current.style.left = totalWidth + (32 * newButton.key)+ 'px'

			currentButton.current.style.width = newWidth + 32 + 'px'
		}
	}

	return (
		<div className="button">
			<span ref={currentButton} className="button__current-element" />
			<div ref={buttonContainer} className="button__wrapper">
				{numOfElements &&
					numOfElements.map((element) => (
						<TabButtonElement
							key={element.key}
							button={element}
							isActive={currentState === element.key}
							onPressed={UpdateCurrentButton}
						/>
					))}
			</div>
		</div>
	)
}

export default TabButton

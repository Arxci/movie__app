import React, { useEffect, useRef } from 'react'
import TabButtonElement from './buttonElement/TabButtonElement'

const TabButton = ({ numOfElements, currentState, setCurrentState, color }) => {
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

	useEffect(() => {
		const initialElement = buttonContainer.current.children[0]

		const initialWidth = initialElement.offsetWidth

		// prettier-ignore
		currentButton.current.style.width = initialWidth + 32 + 'px'
		currentButton.current.style.left = 0
		setCurrentState(0)
	}, [currentButton, buttonContainer, setCurrentState])

	return (
		<div className={'button ' + color}>
			<span
				ref={currentButton}
				className={'button__current-element ' + color}
			/>
			<div ref={buttonContainer} className="button__wrapper">
				{numOfElements &&
					numOfElements.map((element) => (
						<TabButtonElement
							key={element.key}
							button={element}
							isActive={currentState === element.key}
							onPressed={UpdateCurrentButton}
							color={color}
						/>
					))}
			</div>
		</div>
	)
}

export default TabButton

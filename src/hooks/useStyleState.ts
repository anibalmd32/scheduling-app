import { useState } from 'react';

function useStyleSatate() {
	const [isHovered, setIsHoovered] = useState(false);
	const [isPressed, setIsPressed] = useState(false);
	const [isVisible, setIsVisible] = useState(true);

	const handleHover = () => setIsHoovered(!isHovered);
	const handlePress = () => setIsPressed(!isPressed);
	const handleVisibility = () => setIsVisible(!isVisible);

	return {
		isHovered,
		handleHover,
		isPressed,
		handlePress,
		isVisible,
		handleVisibility
	};
}

export default useStyleSatate;

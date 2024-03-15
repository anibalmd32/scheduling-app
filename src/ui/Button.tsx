import { useState } from 'react';
import { ButtonComponentProps } from './ui';
import colorConfig from '../utilities/colorConfig';

function Button ({
	label,
	variant,
	type,
	onClick,
}: ButtonComponentProps) {
	const [isHovered, setIsHoovered] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	const handleHover = () => setIsHoovered(!isHovered);
	const handlePress = () => setIsPressed(!isPressed);

	return (
		<button
			onClick={onClick}
			type={type}
			className={`
				w-fit rounded-lg transition-colors duration-300 p-2 shadow-gray-400 shadow-sm text-gray-200 hover:text-gray-100 font-semibold
				${isPressed && 'shadow-inner'}
			`}
			style={{
				backgroundColor: isHovered ? colorConfig[variant].hover : colorConfig[variant].default
			}}
			onMouseEnter={handleHover}
			onMouseLeave={handleHover}
			onMouseUp={handlePress}
			onMouseDown={handlePress}
		>
			{label}
		</button>
	);
}

export default Button;
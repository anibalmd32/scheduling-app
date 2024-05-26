import useStyleSatate from '../hooks/useStyleState';
import { ButtonComponentProps } from './ui';
import colorConfig from '../utilities/colorConfig';

function Button ({
	label,
	variant,
	type,
	disabled,
	onClick,
}: ButtonComponentProps) {

	const {
		handleHover,
		handlePress,
		isHovered,
		isPressed
	} = useStyleSatate();

	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={`
				w-fit rounded-lg transition-colors duration-300 p-2 shadow-gray-400 shadow-sm text-gray-200 hover:text-gray-100 font-semibold disabled:opacity-50
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

import { NavLink } from 'react-router-dom';
import { createElement } from 'react';
import { MenuItemProps } from './types';

function MenuItem ({
	icon,
	label,
	path
}: MenuItemProps) {
	return (
		<li>
			<NavLink
				to={path}
				className='flex justify-start gap-4 items-center p-2 rounded-2xl hover:bg-blue-950 transition-all duration-300 text-xl font-semibold'
			>
				<span className='hidden md:inline-block'>
					{createElement(icon)}
				</span>
				<span>
					{label}
				</span>
			</NavLink>
		</li>
	);
}

export default MenuItem;
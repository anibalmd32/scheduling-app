import { NavLink } from 'react-router-dom';
import { createElement } from 'react';
import { MenuProps } from './ui';

function Menu ({
	items,
	isOpen,
	toggle
}: MenuProps) {
	return (
		<aside className={`
			bg-blue-900 w-full md:w-56 p-4 fixed h-screen flex justify-center items-start
			transition-all duration-300 text-blue-50 z-40
			${isOpen ? 'translate-x-0' : '-translate-x-full'}
		`}>
			<ul className='w-full flex flex-col gap-4'>
				{items.map((item, index) => (
					<li key={index}>
						<NavLink
							to={item.path}
							onClick={() => {
								window.innerWidth < 768 ? toggle() : null;
							}}
							className={({ isActive }) =>
								[
									isActive ? 'bg-blue-950 text-white' : 'text-blue-50',
									'flex justify-start gap-4 items-center p-2 pl-4 rounded-2xl hover:bg-blue-950 transition-all duration-300 text-md'
								].join(' ')
							}
						>
							<span className='hidden md:inline-block'>
								{createElement(item.icon)}
							</span>
							<span>
								{item.label}
							</span>
						</NavLink>
					</li>
				))}
			</ul>
		</aside>
	);
}

export default Menu;
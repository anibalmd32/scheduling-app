import MenuItem from './MenuItem';
import { MenuProps } from './types';

function Menu ({
	items,
	isOpen
}: MenuProps) {
	return (
		<aside className={`
			bg-blue-900 w-full md:w-56 p-4 fixed h-screen flex justify-center items-start
			transition-all duration-300 text-blue-50 z-40
			${isOpen ? 'translate-x-0' : '-translate-x-full'}
		`}>
			<ul className='w-full flex flex-col gap-4'>
				{items.map((item, index) => (
					<MenuItem key={index} {...item} />
				))}
			</ul>
		</aside>
	);
}

export default Menu;
import { FaWindowClose } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

import { TopbarProps } from './types';

function TopbarBtn({
	handleOpen,
	isOpen
}: TopbarProps) {
	return (
		<button
			onClick={handleOpen}
			className='text-2xl'
		>
			{isOpen ? <FaWindowClose /> : <GiHamburgerMenu />}
		</button>
	);
}

export default TopbarBtn;
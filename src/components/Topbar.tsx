import { TopbarProps } from './ui';
import { FaWindowClose } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

function Topbar ({
	handleOpen,
	isOpen
}: TopbarProps) {
	return (
		<div className={`
			bg-blue-900 w-full p-4 fixed top-0 left-0 text-blue-50 z-50
		`}>
			<button
				onClick={handleOpen}
				className='text-2xl'
			>
				{isOpen ? <FaWindowClose /> : <GiHamburgerMenu />}
			</button>
		</div>
	);
}

export default Topbar;
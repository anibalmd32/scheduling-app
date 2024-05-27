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
			flex justify-between items-center
		`}>
			<button
				onClick={handleOpen}
				className='text-2xl'
			>
				{isOpen ? <FaWindowClose /> : <GiHamburgerMenu />}
			</button>

			<div className='text-xl font-bold flex gap-4 justify-center items-center'>
				<h1>Horarios UNEFA</h1>

				<div className=''>
					<img src="/unefa-escudo.png" alt="Logo UNEFA" className='w-10 h-10' />
				</div>
			</div>
		</div>
	);
}

export default Topbar;
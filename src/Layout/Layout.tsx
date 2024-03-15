import { useState } from 'react';
import Topbar from '../components/Topbar';
import Menu from '../components/Menu';
import navigation from '../utilities/navigation';
import PageContainer from '../components/PageContainer';

function Layout () {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(!isOpen);

	return (
		<main className='overflow-x-hidden'>
			<Topbar handleOpen={handleOpen} isOpen={isOpen} />
			<Menu isOpen={isOpen} items={navigation} />
			<PageContainer isOpen={isOpen} />
		</main>
	);
}

export default Layout;
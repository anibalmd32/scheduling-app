import { useState } from 'react';
import Topbar from '../ui/Topbar/Topbar';
import Menu from '../ui/Menu/Menu';
import navigation from '../utilities/navigation';

function Layout () {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(!isOpen);

	return (
		<main>
			<Topbar handleOpen={handleOpen} isOpen={isOpen} />
			<Menu
				isOpen={isOpen}
				items={navigation}
			/>
		</main>
	);
}

export default Layout;
import { Outlet } from 'react-router-dom';
import { PageContainerProps } from './types';

function PageContainer({ isOpen }: PageContainerProps) {
	return (
		<section
			className={`
				container mx-auto p-4 transition-all duration-300 max-w-full min-w-full
			`}
			style={{ marginLeft: isOpen ? '14rem' : '0' }}
		>
			<Outlet />
		</section>
	);
}

export default PageContainer;
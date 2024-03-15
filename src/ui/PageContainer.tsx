import { Outlet } from 'react-router-dom';
import { PageContainerProps } from './ui';

function PageContainer({ isOpen }: PageContainerProps) {
	return (
		<section
			className={`
				constainer p-4 transition-all duration-300 float-end 
				${isOpen ? 'w-10/12' : 'w-full'}
			`}
		>
			<Outlet />
		</section>
	);
}

export default PageContainer;

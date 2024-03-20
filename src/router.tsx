import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';

// *Pages
import Schedules from './modules/schedules/Schedules';
import Classrooms from './modules/classrooms/Classrooms';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/schedules',
				element: <Schedules />
			},
			{
				path: '/classrooms',
				element: <Classrooms />
			}
		]
	}
]);

export default router;
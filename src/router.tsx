import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';

// *Pages
import Schedules from './modules/schedules/Schedules';
import Classrooms from './modules/classrooms/Classrooms';
import Semesters from './modules/semesters/Semester';

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
			},
			{
				path: '/semesters',
				element: <Semesters />
			}
		]
	}
]);

export default router;

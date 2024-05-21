import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';

// *Pages
import Schedules from './modules/schedules/Schedules';
import Classrooms from './modules/classrooms/Classrooms';
import Professors from './modules/professors/Professors';
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
				path: '/professors',
				element: <Professors />
			},
			{
				path: '/semesters',
				element: <Semesters />
			}
		]
	}
]);

export default router;

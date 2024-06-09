import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';

// *Pages
import Schedules from './modules/schedules/Schedules';
import Classrooms from './modules/classrooms/Classrooms';
import Professors from './modules/professors/Professors';
import Semesters from './modules/semesters/Semester';
import PrintSchedule from './modules/print/PrintSchedule';
import Generate from './modules/generate/Generate';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Navigate to="/schedules" replace />
			},
			{
				path: '/schedules',
				element: <Schedules />
			},
			{
				path: '/generate',
				element: <Generate />
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
	},
	{
		path: '/print',
		element: <PrintSchedule />
	}
]);

export default router;

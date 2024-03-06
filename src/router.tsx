import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import Schedules from './modules/schedules/Schedules';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/schedules',
				element: <Schedules />
			}
		]
	}
]);

export default router;
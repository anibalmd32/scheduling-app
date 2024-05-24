import { MenuItemProps } from '../components/ui';

import { FaHome } from 'react-icons/fa';
import { GrScheduleNew } from 'react-icons/gr';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { PiNotebookFill } from 'react-icons/pi';

const navigation: MenuItemProps[] = [
	{
		icon: FaHome,
		label: 'Inicio',
		path: '/'
	},
	{
		icon: GrScheduleNew,
		label: 'Horarios',
		path: '/schedules'
	},
	{
		icon: SiGoogleclassroom,
		label: 'Aulas',
		path: '/classrooms'
	},
	{
		icon: FaChalkboardTeacher,
		label: 'Profesores',
		path: '/professors'
	},
	{
		icon: PiNotebookFill,
		label: 'Semestres',
		path: '/semesters'
	}
];

export default navigation;
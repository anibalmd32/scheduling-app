// * VIEWS
import { ClassroomScheduleView } from '../views/ClassroomScheduleView';

// * DEFINITIONS
import type { TabItem } from '../../../components/ui';

export default function scheduleModuleTabs(): TabItem[] {
	return [
		{
			index: 0,
			label: 'Por Salones',
			view: <ClassroomScheduleView /> 
		}
	];
}

import Tabs from '../../../components/Tabs';
import ScheduleView from './ScheduleView';

export default function ScheduleOptions() {

	return (
		<Tabs
			items={[
				{
					index: 0,
					label: 'Por salones',
					view: <ScheduleView modalParam='semesters' viewParam='classrooms' />,
				},
				{
					index: 1,
					label: 'Por semestres',
					view: <ScheduleView modalParam='classrooms' viewParam="semesters" />,
				}
			]}
		/>
	);
}

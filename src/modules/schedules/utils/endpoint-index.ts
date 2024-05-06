import type { ScheduleParam } from '../schedules.d';
import * as apiEndpintLib from '../libs/endpoint-lib';

const endpointIndex: Record<ScheduleParam, string> = {
	'semesters': apiEndpintLib.getSemesterList(),
	'classrooms': apiEndpintLib.getClassroomList(),
};

export default endpointIndex;

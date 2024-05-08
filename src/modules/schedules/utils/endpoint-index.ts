import * as apiEndpintLib from '../libs/endpoint-lib';

const endpointIndex: Record<string, string> = {
	'semesters': apiEndpintLib.getSemesterList(),
	'classrooms': apiEndpintLib.getClassroomList(),
};

export default endpointIndex;

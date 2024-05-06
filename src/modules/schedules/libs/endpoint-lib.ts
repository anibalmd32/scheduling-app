import { ScheduleQuery } from '../schedules.d';

export const getSchedulesEvents = (query: ScheduleQuery) => {
	return `/as-events?${query.query}=${query.value}`;
};
	
export const getSemesterList = () => '/';

export const getDegreeList = () => '/all';

export const getClassroomList = () => '/';

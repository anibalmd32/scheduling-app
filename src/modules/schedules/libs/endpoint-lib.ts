import { ScheduleQuery } from '../def';

export const getSchedulesEvents = (query: ScheduleQuery) => {
	return `/as-events?${query.query}=${query.value}`;
};
	
export const getSemesterList = () => '/';
export const getClassroomList = () => '/';
export const createScheduleFromClassroom = () => '/classroom/create';
export const updateSchedule = (scheduleID: string) => `/as-events/${scheduleID}`;
export const delteSchedule = (scheduleID: string) => `/as-events/${scheduleID}`;

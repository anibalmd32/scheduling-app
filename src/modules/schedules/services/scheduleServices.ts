import HTTPService from '../../../http.service';
import type { ScheduleEvent } from '../../classrooms/def';
import * as enpointLib from '../libs/endpoint-lib';
import type { NewScheduleEventData, UpdateSchedule, DeleteSchedule } from '../def';

const service = new HTTPService('schedules');

export const getSchedulesForClassroom = async (classroomID: string): Promise<ScheduleEvent[]> => {
	const { data } = await service.httpCaller<ScheduleEvent[]>({
		endpoint: enpointLib.getSchedulesEvents({
			query: 'classroom',
			value: classroomID
		}),
		method: 'get',
	});

	return data;
};

export const createScheduleFromClassroom = async (data: NewScheduleEventData): Promise<ScheduleEvent> => {
	const { data: schedule } = await service.httpCaller<ScheduleEvent>({
		endpoint: enpointLib.createScheduleFromClassroom(),
		method: 'post',
		body: data
	});

	return schedule;
};

export const updateSchedule = async (scheduleID: string, data: UpdateSchedule): Promise<ScheduleEvent> => {
	const { data: schedule } = await service.httpCaller<ScheduleEvent>({
		endpoint: enpointLib.updateSchedule(scheduleID),
		method: 'put',
		body: data
	});

	return schedule;
};

export const deleteSchedule = async (scheduleID: string, data: DeleteSchedule): Promise<void> => {
	await service.httpCaller({
		endpoint: enpointLib.delteSchedule(scheduleID),
		method: 'delete',
		body: data
	});
};

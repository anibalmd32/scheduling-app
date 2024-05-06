import { useState } from 'react';
import HTTPService from '../../../http.service';
import { ScheduleParams, ScheduleEvent } from '../def';

const service = new HTTPService('schedules');

function useSchedule() {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [events, setEvents] = useState<ScheduleEvent[]>([]);

	const handleOpenModal = () => setIsOpenModal(!isOpenModal);
	const getSchedule = async ({
		degree,
		semester,
		classroom
	}: ScheduleParams) => {
		try {
			const { data } = await service.httpCaller<ScheduleEvent>({
				endpoint: '/as-events',
				method: 'get',
				params: {
					classroom: 'aula 12'
				}
			});

			setEvents(data);
			handleOpenModal();
		} catch (error) {
			console.log(error);
		}
	};


	return {
		isOpenModal,
		handleOpenModal,
		getSchedule,
		events
	};
}

export default useSchedule;

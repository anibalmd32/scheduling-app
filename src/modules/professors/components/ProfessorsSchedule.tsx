import React from 'react';
import Modal from '../../../components/Modal';
import Callendar from '../../../components/Callendar';
import { ScheduleEventData } from '../../schedules/def';
import SubjectDetails from './SubjectDetails';

export default function ProfessorSchedule({ events, open, close }: {
	events: ScheduleEventData[],
	open: boolean,
	close: () => void
}) {

	const [openModalDetails, setOpenModalDetails] = React.useState<boolean>(false);
	const [details, setDetails] = React.useState<ScheduleEventData>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [callendarEvent, setCallendarEvent] = React.useState<any>();

	const handleToggleDetails = () => setOpenModalDetails(!openModalDetails);

	const handleOpenModalDetails = (eventId: string) => {
		const eventClicked = events.find(event => event.id === eventId);
		setDetails(eventClicked);
		handleToggleDetails();
	};

	return (
		<Modal open={open} onClose={close}>
			<SubjectDetails
				details={details}
				close={handleToggleDetails}
				open={openModalDetails}
				callendarEvent={callendarEvent}
			/>
			{
				events ? (
					<Callendar
						events={events}
						handleInputEvent={() => {}}
						handleClickEvent={(event) => {
							setCallendarEvent(event);
							const eventId = event.event.id;
							handleOpenModalDetails(eventId);
						}}
						handleChangeEvent={() => {}}
						onAddEvent={() => {}}
						onDeletEvent={() => {}}
					/>

				) : (
					<p className='text-center mt-4'>No se le asignado materias</p>
				)
			}
		</Modal>
	);
}
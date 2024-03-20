
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CallendarProps } from './ui';

export default function Callendar({
	events,
	onExport
}: CallendarProps) {
	return (
		<div>
			<button onClick={onExport}>Exportar a PDF</button>
			<div id='myCalendar'>
				<FullCalendar
					plugins={[timeGridPlugin]}
					initialView="timeGridWeek"
					nowIndicator={false}
					locale={'es'}
					slotMinTime={'07:00:00'}
					slotMaxTime={'18:15:00'}
					slotDuration={'00:45:00'}
					allDaySlot={false}
					initialDate={new Date('2024-02-19')}
					hiddenDays={[6]}
					contentHeight={'auto'}
					headerToolbar={{
						start: '',
						center: '',
						end: ''
					}}
					editable={true}
					dayHeaderContent={({date}) => {
						const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
						return days[date.getDay()];
					}}
					slotLabelFormat={{
						'hour': 'numeric',
						'minute': '2-digit',
						'hour12': false
					}}
					events={events}
					eventContent={eventInfo => {
						return (
							<div>
								{eventInfo.event.title}
							</div>
						);
					}}
				/>
			</div>
		</div>
	);
}
    
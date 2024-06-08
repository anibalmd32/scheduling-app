import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleEventData } from '../modules/schedules/def';
import Button from './Button';
import { CallendarProps } from './ui';

export default function Callendar({
	events,
	handleInputEvent,
	handleClickEvent,
	handleChangeEvent,
	onAddEvent,
	onDeletEvent,
	interactive,
	selectable,
	forPint,
	onExport,
	generate
}: CallendarProps) {
	
	// Condicionalmente incluir interactionPlugin
	const plugins = [timeGridPlugin];
	if (interactive) {
		plugins.push(interactionPlugin);
	}

	return (
		<div>
			<div className='flex gap-4'>
				{!forPint && (
					<Button
						label='Exportar a PDF'
						type='button'
						variant='info'
						onClick={onExport}
					/>
				)}

				{
					generate && (
						<Button
							label='Generar horario'
							type='button'
							variant='info'
							disabled={generate.disabled}
							onClick={generate.onClick}
						/>
					)
				}
			</div>

			<div id='myCalendar'>
				<FullCalendar
					eventOverlap={false}
					plugins={plugins}
					selectable={selectable}
					select={handleInputEvent}
					eventClick={handleClickEvent}
					eventChange={handleChangeEvent}
					eventAdd={onAddEvent}
					eventRemove={onDeletEvent}
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
						const event = eventInfo.event as unknown as ScheduleEventData;
						return (
							<div className=''>
								{
									forPint ? (
										<div className='text-sm text-black'>
											<p>
												Materia: {event.title}
											</p>
		
										</div>
									) : (
										<div>
											{eventInfo.event.title}
										</div>
									)
								}
							</div>
						);
					}}
				/>
			</div>
		</div>
	);
}
    
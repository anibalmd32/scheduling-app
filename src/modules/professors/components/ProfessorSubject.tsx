import { useState, useEffect } from 'react';
import useData from '../../../hooks/useData';
import Modal from '../../../components/Modal';
import { SelectItem } from '../../../components/ui';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

interface ScheduleData {
	classroom: string;
	createdAt: string;
	day: string;
	degree: string;
	endTime: string;
	extra: {
		[key: string]: string;
	},
	id: string;
	semester: number;
	startTime: string;
	subject: string;
	subjectId: string;
	updatedAt: string;
}

export default function ProfessorSubject({ open, close, handleAsignSubject }: {
	open: boolean,
	close: () => void,
	handleAsignSubject: (scheduleSelected: unknown) => Promise<void>
}) {
	const [items, setItems] = useState<SelectItem[]>([]);
	const [selectedItem, setSelectedItem] = useState<string>('');

	const { data: scheduleEvents } = useData<ScheduleData[]>({
		module: 'schedules',
		requestConfig: {
			endpoint: '/',
			method: 'get'
		}
	});

	useEffect(() => {
		if (scheduleEvents) {
			const selectItems = scheduleEvents.map((scheduleEvent) => ({
				label: scheduleEvent.subject,
				value: scheduleEvent.id
			}));
			setItems(selectItems);
		}
	}, [scheduleEvents]);

	return (
		<Modal open={open} onClose={() => {
			close();
			setSelectedItem('');
		}}>
			{
				items.length ? <Select
					items={items}
					label='Seleccione una materia para asignar a este profesor'
					name='subject'
					onChange={(e) => {
						setSelectedItem(e.target.value);
					}}
					value={selectedItem}
				/> : (
					<p className='mt-4 text-center text-gray-500'>No hay materias para asignar</p>
				)
			}

			<div className='mt-4'>
				<Button
					onClick={() => {
						const scheduleSelected = scheduleEvents?.find(scheduleEvent => scheduleEvent.id === selectedItem);
						handleAsignSubject(scheduleSelected);
					}}
					label='Asignar'
					type='button'
					variant='success'
					disabled={!selectedItem}
				/>
			</div>
				
		</Modal>
	);
}
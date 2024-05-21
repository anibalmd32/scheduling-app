import React from 'react';
import { useProfessors } from '../context/ProfessorsContext';
import ProfessorSubject from './ProfessorSubject';
import Table from '../../../components/Table';
import { RenderCell } from '../../../components/ui';
import { Professors } from '../def';
import { BiTrash, BiPencil } from 'react-icons/bi';
import { MdUpdate } from 'react-icons/md';
import { GrScheduleNew } from 'react-icons/gr';
import ProfessorSchedule from './ProfessorsSchedule';
import { ScheduleEventData } from '../../schedules/def';

export default function ProfessorsTable() {
	const [openEventModal, setOpenEventModal] = React.useState<boolean>(false);
	const [events, setEvents] = React.useState<ScheduleEventData[]>([]);

	const handleToggleSubjectModal = () => setOpenEventModal(!openEventModal);

	const {
		professors,
		handleUpdate,
		handleDelete,
		openSubjectModal,
		handleOpenSubjectModal,
		handleAsignSubject
	} = useProfessors();

	const columns: RenderCell<Professors>[] = [
		{
			column: 'Nombre',
			render(cell) {
				return (
					<>
						{cell.data.firstName}
					</>
				);
			},
		},
		{
			column: 'Apellido',
			render(cell) {
				return (
					<>
						{cell.data.lastName}
					</>
				);
			},
		},
		{
			column: 'Cedula',
			render(cell) {
				return (
					<>
						{cell.data.dni}
					</>
				);
			},
		},
		{
			column: 'Email',
			render(cell) {
				return (
					<>
						{cell.data.email}
					</>
				);
			},
		},
		{
			column: 'Acciones',
			render(cell) {
				return (
					<div className='flex gap-4'>
						<button
							className='text-2xl text-orange-500 hover:scale-125 transition-transform duration-300'
							title='Ver horario'
							onClick={() => {
								setOpenEventModal(true);
								setEvents(cell.schedule);
							}}
						>
							<GrScheduleNew />
						</button>
						<button
							className='text-2xl text-blue-500 hover:scale-125 transition-transform duration-300'
							title='Actualizar'
							onClick={() => handleUpdate(cell)}
						>
							<MdUpdate />
						</button>
						<button
							className='text-2xl text-green-500 hover:scale-125 transition-transform duration-300'
							title='Asiganr materia'
							onClick={() => handleOpenSubjectModal(cell._id)}
						>
							<BiPencil />
						</button>
						<button
							className='text-2xl text-red-500 hover:scale-125 transition-transform duration-300'
							title='Eliminar'
							onClick={() => handleDelete(cell)}
						>
							<BiTrash />
						</button>
					</div>
				);
			},
		}
	];

	return (
		<div>
			<ProfessorSubject
				open={openSubjectModal}
				close={handleOpenSubjectModal}
				handleAsignSubject={handleAsignSubject}
			/>

			<ProfessorSchedule
				open={openEventModal}
				close={handleToggleSubjectModal}
				events={events}
			/>

			{!professors.length && <p>No hay profesores</p>}
			{
				professors.length && <Table
					data={professors}
					cells={columns}
				/>
			}
		</div>
	);
}
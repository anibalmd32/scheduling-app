import { useProfessors } from '../context/ProfessorsContext';
import Table from '../../../components/Table';
import { RenderCell } from '../../../components/ui';
import { Professors } from '../def';
import { BiTrash } from 'react-icons/bi';
import { MdUpdate } from 'react-icons/md';
import { GrScheduleNew } from 'react-icons/gr';

export default function ProfessorsTable() {
	const { professors, handleUpdate, handleDelete } = useProfessors();

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
							className='text-2xl text-blue-500 hover:scale-125 transition-transform duration-300'
							title='Actualizar'
							onClick={() => handleUpdate(cell)}
						>
							<MdUpdate />
						</button>
						<button
							className='text-2xl text-red-500 hover:scale-125 transition-transform duration-300'
							title='Eliminar'
							onClick={() => handleDelete(cell)}
						>
							<BiTrash />
						</button>
						<button
							className='text-2xl text-green-500 hover:scale-125 transition-transform duration-300'
							title='Eliminar'
							onClick={() => {}}
						>
							<GrScheduleNew />
						</button>
					</div>
				);
			},
		}
	];

	return (
		<div>
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
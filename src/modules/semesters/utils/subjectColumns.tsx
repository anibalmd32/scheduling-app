import { RenderCell } from '../../../components/ui';
import { SubjectData, RowActions } from '../def';
import { BiTrash } from 'react-icons/bi';
import { MdUpdate } from 'react-icons/md';

function renderSubjectCell<T>({
	deleteRow,
	updateRow
}: RowActions<T>) {
	const subjectColumns: RenderCell<SubjectData>[] = [
		{
			column: 'Nombre',
			render(cell) {
				return (
					<>
						{cell.name}
					</>
				);
			},
		},
		{
			column: 'Horas teóricas',
			render(cell) {
				return (
					<>
						{cell.theoryHours}
					</>
				);
			},
		},
		{
			column: 'Horas prácticas',
			render(cell) {
				return (
					<>
						{cell.practiceHours}
					</>
				);
			},
		},
		{
			column: 'Horas de laboratorio',
			render(cell) {
				return (
					<>
						{cell.laboratoryHours}
					</>
				);
			},
		},
		{
			column: 'Acciones',
			render(row) {
				return (
					<div className='flex gap-4'>
						<button
							className='text-2xl text-blue-500 hover:scale-125 transition-transform duration-300'
							title='Actualizar'
							onClick={() => updateRow(row)}
						>
							<MdUpdate />
						</button>
						<button
							className='text-2xl text-red-500 hover:scale-125 transition-transform duration-300'
							title='Eliminar'
							onClick={() => deleteRow(row)}
						>
							<BiTrash />
						</button>
					</div>
				);
			},
		}
	];

	return subjectColumns;
}

export default renderSubjectCell;

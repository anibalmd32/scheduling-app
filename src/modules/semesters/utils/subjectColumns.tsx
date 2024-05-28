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
				if (cell.theoryHours !== 0) {
					const hourArray = String(cell.theoryHours).split('.');
					const hours = hourArray[0];
					let minutes = hourArray[1];
	
					if ( minutes && minutes.length === 1) {
						minutes = `${minutes}0`;
					}

					return (
						<>
							{`${hours} h - ${minutes ?? '00'} min`}
						</>
					);
				} else {
					return (
						<>
							{cell.theoryHours} h
						</>
					);
				}

			},
		},
		{
			column: 'Horas prácticas',
			render(cell) {
				if (cell.practiceHours !== 0) {
					const hourArray = String(cell.practiceHours).split('.');
					const hours = hourArray[0];
					let minutes = hourArray[1];
	
					if ( minutes && minutes.length === 1) {
						minutes = `${minutes}0`;
					}

					return (
						<>
							{`${hours} h - ${minutes ?? '00'} min`}
						</>
					);
				} else {
					return (
						<>
							{cell.practiceHours} h
						</>
					);
				}
			},
		},
		{
			column: 'Horas de laboratorio',
			render(cell) {
				if (cell.laboratoryHours !== 0) {
					const hourArray = String(cell.laboratoryHours).split('.');
					const hours = hourArray[0];
					let minutes = hourArray[1];
	
					if ( minutes && minutes.length === 1) {
						minutes = `${minutes}0`;
					}

					return (
						<>
							{`${hours} h - ${minutes ?? '00'} min`}
						</>
					);
				} else {
					return (
						<>
							{cell.laboratoryHours} h
						</>
					);
				}
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

import Button from '../../../components/Button';
import { useProfessors } from '../context/ProfessorsContext';

export default function ProfessorsAdd() {
	const { handleOpenForm } = useProfessors();

	return (
		<div>
			<Button
				onClick={handleOpenForm}
				label='Agregar Profesor'
				type='button'
				variant='info'
			/>
		</div>
	);
}
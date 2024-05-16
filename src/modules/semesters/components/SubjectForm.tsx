// * Hooks
import useForm from '../../../hooks/useForm';
// import useSemesters from '../hooks/useSemesters';

// * COMPONENTS
import Modal from '../../../components/Modal';
import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

// * DEFININIONS
import { SubjectData, SubjectFormProps } from '../def';

function SubjectForm({
	defaultValues,
	openForm,
	onSubmit,
	onCloseModal
}: SubjectFormProps) {
	const {
		formData,
		handleChange,
		handleSubmit,
		resetForm
	} = useForm<SubjectData>(defaultValues);

	return (
		<Modal onClose={() => {
			onCloseModal();
			resetForm();
		}} open={openForm}>
			<Form onSubmit={(e) => onSubmit(handleSubmit(e))}>
				<Input
					name='name'
					onChange={handleChange}
					placeholder='Ej: Matemática'
					type='text'
					value={formData.name}
					label='Nombre'
				/>
				{/* <Input
					name='theoryHours'
					onChange={handleChange}
					placeholder=''
					type='number'
					value={formData.theoryHours}
					label='Horas de teoría'
				/>
				<Input
					name='practiceHours'
					onChange={handleChange}
					placeholder=''
					type='number'
					value={formData.practiceHours}
					label='Horas de práctica'
				/>
				<Input
					name='laboratoryHours'
					onChange={handleChange}
					placeholder=''
					type='number'
					value={formData.laboratoryHours}
					label='Horas de Laboratorio'
				/> */}

				<div className='flex gap-4 mt-4'>
					<Button
						label='Enviar'
						type='submit'
						variant='success'
					/>
					<Button
						label='Cancelar'
						type='reset'
						variant='error'
						onClick={() => {
							resetForm();
							onCloseModal();
						}}
					/>
				</div>
			</Form>
		</Modal>
	);
}

export default SubjectForm;
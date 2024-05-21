import { useProfessors } from '../context/ProfessorsContext';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Form from '../../../components/Form';
import Input from '../../../components/Input';

export default function ProfessorForm() {
	const { formData, handleChange, handleSubmit, handleOpenForm, openForm, onSubmit } = useProfessors();

	return (
		<Modal onClose={() => {
			handleOpenForm();
		}} open={openForm}>
			<Form onSubmit={(e) => onSubmit(handleSubmit(e))}>
				<Input
					name='firstName'
					onChange={handleChange}
					placeholder='Nombre'
					type='text'
					value={formData.firstName}
					label='Nombre'
				/>
				<Input
					name='lastName'
					onChange={handleChange}
					placeholder='Apellido'
					type='text'
					value={formData.lastName}
					label='Apellido'
				/>
				<Input
					name='dni'
					onChange={handleChange}
					placeholder='Cédula'
					type='text'
					value={formData.dni}
					label='Cédula'
				/>
				<Input
					name='email'
					onChange={handleChange}
					placeholder='Email'
					type='text'
					value={formData.email}
					label='Email'
				/>
				<Input
					name='phone'
					onChange={handleChange}
					placeholder='Teléfono'
					type='text'
					value={formData.phone}
					label='Teléfono'
				/>
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
							handleOpenForm();
						}}
					/>
				</div>
			</Form>
		</Modal>
	);
}
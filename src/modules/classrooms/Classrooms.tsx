import React from 'react';
import { ClassroomProvider } from './hooks/useClassroom';
import ClassroomList from './components/ClassroomList';
import Button from '../../components/Button';
import ClassroomForm from './components/ClassromForm';
import Toast from '../../components/Toast';

function Classrooms() {	

	const [openForm, setOpenForm] = React.useState(false);
	const [showToast, setShowToast] = React.useState({
		loading: false,
		success: false,
		error: false
	});

	const handleOpenForm = () => setOpenForm(!openForm);
	return (
		<ClassroomProvider>
			<section className='mt-8'>
				<div className='mb-8'>
					<h1 className='text-3xl text-blue-950 font-bold mb-4'>
						Aulas
					</h1>
					<Button label='Agregar aula' type='button' variant='info' onClick={handleOpenForm} />
				</div>
				<ClassroomList />
				<ClassroomForm
					open={openForm}
					onClose={handleOpenForm}
					setShowToast={setShowToast}
					showToast={showToast}
				/>

				{showToast.loading && (
					<Toast
						message='Cargando'
						variant='info'
						isLoader
					/>
				)}

				{showToast.success && (
					<Toast
						message='Exito en la operacion'
						variant='success'
						duraction={3000}
					/>
				)}

				{showToast.error && (
					<Toast
						message='Error en la operacion'
						variant='error'
						duraction={3000}
					/>
				)}
			</section>
		</ClassroomProvider>
	);
}

export default Classrooms;

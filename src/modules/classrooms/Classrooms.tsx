import React from 'react';
import { ClassroomProvider } from './useClassroom';
import ClassroomList from './components/ClassroomList';
import Button from '../../components/Button';
import ClassroomForm from './components/ClassromForm';

function Classrooms() {	

	const [openForm, setOpenForm] = React.useState(false);

	const handleOpenForm = () => setOpenForm(!openForm);
	return (
		<ClassroomProvider>
			<section className='mt-8'>
				<div className='mb-8'>
					<h1 className='text-4xl font-semibold text-blue-950'>
						Aulas
					</h1>
					<Button label='Agregar aula' type='button' variant='info' onClick={handleOpenForm} />
				</div>
				<ClassroomList />
				<ClassroomForm
					open={openForm}
					onClose={handleOpenForm}
				/>
			</section>
		</ClassroomProvider>
	);
}

export default Classrooms;

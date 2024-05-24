import { ClassroomProvider } from './useClassroom';
import ClassroomList from './components/ClassroomList';
import Button from '../../components/Button';

function Classrooms() {	
	const handleAddClassroom = () => {
		alert('Trabajo en progreso');
	};
	return (
		<ClassroomProvider>
			<section className='mt-8'>
				<div className='mb-8'>
					<h1 className='text-4xl font-semibold text-blue-950'>
						Aulas
					</h1>
					<Button label='Agregar aula' type='button' variant='info' onClick={handleAddClassroom} />
				</div>
				<ClassroomList />
			</section>
		</ClassroomProvider>
	);
}

export default Classrooms;

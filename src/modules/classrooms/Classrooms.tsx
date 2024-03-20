import { ClassroomProvider } from './useClassroom';
import ClassroomList from './components/ClassroomList';

function Classrooms() {	
	return (
		<ClassroomProvider>
			<section>
				<ClassroomList />
			</section>
		</ClassroomProvider>
	);
}

export default Classrooms;

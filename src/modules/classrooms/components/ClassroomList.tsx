import useClassroom from '../useClassroom';
import ClassroomCard from './ClassroomCard';
import { ClipLoader } from 'react-spinners';

function ClassroomList() {
	const { classroomsData, isLoading } = useClassroom();

	return (
		<section>
			{
				isLoading
					? <ClipLoader size={80} />
					: (
						<>
							<div className='md:flex flex-wrap gap-8 justify-center'>
								{
									classroomsData.map(classroom => (
										<ClassroomCard
											key={classroom.code}
											{...classroom}
										/>
									))
								}

							</div>
						</>
						
					)
			}
		</section>
	);
}

export default ClassroomList;

import useSemesters from '../hooks/useSemesters';
import Tabs from '../../../components/Tabs';

function SemestersList() {
	const { semestersTabItems } = useSemesters();

	return (
		<>
			{semestersTabItems?.length ? <Tabs items={semestersTabItems} /> : (
				<p className='mt-4'>No hay semestres</p>
			)}
			
		</>
	);
}

export default SemestersList;
